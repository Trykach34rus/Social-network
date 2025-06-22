import {
	ChatBubbleIcon,
	EyeOpenIcon,
	HeartFilledIcon,
	HeartIcon,
	PaperPlaneIcon,
} from '@radix-ui/react-icons'
import {
	Avatar,
	Badge,
	Box,
	Card,
	Flex,
	Heading,
	IconButton,
	Separator,
	Text,
	TextField,
} from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import axiosInstance from '../axiosInstance'
import { addNewComment } from '../redux/slices/postsReducer'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { Comment, PostT, UserT } from '../types'

type Props = {
	item: PostT
	fullWidth?: boolean
}

export default function Post({ item, fullWidth = false }: Props) {
	const [user, setUser] = useState<UserT | null>(null)
	const [body, setBody] = useState<string>('')
	const [comments, setComments] = useState<Comment[]>([])
	const [open, setOpen] = useState<boolean>(false)
	useEffect(() => {
		if (item.userId) {
			axiosInstance.get(`/users/${item.userId}`).then(res => {
				setUser(res.data)
			})
		}
		if (item.id) {
			axiosInstance.get(`/posts/${item.id}/comments`).then(res => {
				setComments(res.data.comments)
			})
		}
	}, [item.userId])

	const dispatch = useAppDispatch()
	const { userId, userInfo } = useAppSelector(state => state.user)

	function handleComment() {
		if (
			body &&
			userId &&
			userInfo?.id &&
			userInfo.username &&
			userInfo.firstName &&
			userInfo.lastName
		) {
			dispatch(addNewComment({ postId: item.id, likes: 0, body, userId }))
			setComments(prev => [
				...prev,
				{
					postId: item.id,
					likes: 0,
					body,
					user: {
						id: userInfo.id,
						username: userInfo.username,
						fullName: userInfo.firstName + ' ' + userInfo.lastName,
					},
					id: Date.now(),
				},
			])
		}
	}
	return (
		<Box width={fullWidth ? '100%' : '600px'}>
			<Card size='2'>
				<Flex justify={'between'} align={'center'}>
					{user && (
						<Flex gap='3' align='center'>
							<Link to={`/profile/${user.id}`}>
								<Avatar size='3' src={user.image} radius='full' fallback='T' />
							</Link>
							<Box>
								<Text as='div' size='2' weight='bold'>
									{user.firstName} {user.lastName}
								</Text>
								<Text as='div' size='2' color='gray'>
									{user.company.department}
								</Text>
							</Box>
						</Flex>
					)}
					<Flex gap={'2'}>
						{item.tags.map(tag => (
							<Badge key={tag} color='green'>
								{tag}
							</Badge>
						))}
					</Flex>
				</Flex>
				<Heading mt={'4'}>{item.title}</Heading>
				<Text mt={'2'}>{item.body}</Text>
				<Separator my='3' size='4' />
				<Flex gap={'2'} mt={'4'} justify={'between'} align={'center'}>
					<Flex gap={'4'}>
						<Flex align={'center'} gap={'2'}>
							<HeartFilledIcon />
							<Text>{item.reactions.likes}</Text>
						</Flex>
						<Flex
							align={'center'}
							gap={'2'}
							onClick={() => setOpen(prev => !prev)}
						>
							<ChatBubbleIcon />
							<Text>{comments.length}</Text>
						</Flex>
					</Flex>
					<Flex align={'center'} gap={'2'}>
						<EyeOpenIcon />
						<Text>{item.views}</Text>
					</Flex>
				</Flex>
				{open && (
					<Flex direction={'column'}>
						<Text align={'center'} my={'2'}>
							Comments
						</Text>
						<Flex direction={'column'} gap={'2'}>
							{comments.map(comment => (
								<Flex gap='3' align='end' key={comment.id}>
									<Link to={`/profile/${comment.user.id}`}>
										<Avatar
											size='3'
											radius='full'
											fallback={comment.user.fullName[0]}
											color='indigo'
										/>
									</Link>

									<Card>
										<Flex justify={'between'} align={'start'}>
											<Flex direction={'column'} gap={'2'}>
												<Text as='div' size='2' weight='bold'>
													{comment.user.fullName}
												</Text>
												<Text as='div' size='2' color='gray'>
													{comment.body}
												</Text>
											</Flex>
											<Flex align={'center'} gap={'1'}>
												<HeartIcon />
												<Text size={'1'}>{comment.likes}</Text>
											</Flex>
										</Flex>
									</Card>
								</Flex>
							))}
						</Flex>
						<Flex mt={'5'} gap={'2'}>
							<TextField.Root
								value={body}
								onChange={e => setBody(e.target.value)}
								size='2'
								placeholder='Write a message...'
								style={{ width: '100%' }}
							/>
							<IconButton
								size={'2'}
								onClick={handleComment}
								disabled={body.trim().length === 0}
							>
								<PaperPlaneIcon />
							</IconButton>
						</Flex>
					</Flex>
				)}
			</Card>
		</Box>
	)
}
