import {
	ChatBubbleIcon,
	EyeOpenIcon,
	HeartFilledIcon,
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
import axiosInstance from '../axiosInstance'
import { Comment, PostT, UserT } from '../types'

type Props = {
	item: PostT
}

export default function Post({ item }: Props) {
	const [user, setUser] = useState<UserT | null>(null)
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
	console.log(comments)
	return (
		<Box width='600px'>
			<Card size='2'>
				<Flex justify={'between'} align={'center'}>
					{user && (
						<Flex gap='3' align='center'>
							<Avatar size='3' src={user.image} radius='full' fallback='T' />
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
									<Avatar
										size='3'
										radius='full'
										fallback={comment.user.fullName[0]}
										color='indigo'
									/>
									<Card>
										<Text as='div' size='2' weight='bold'>
											{comment.user.fullName}
										</Text>
										<Text as='div' size='2' color='gray'>
											{comment.body}
										</Text>
									</Card>
								</Flex>
							))}
						</Flex>
						<Flex mt={'5'} gap={'2'}>
							<TextField.Root
								size='2'
								placeholder='Write a message...'
								style={{ width: '100%' }}
							/>
							<IconButton size={'2'}>
								<PaperPlaneIcon />
							</IconButton>
						</Flex>
					</Flex>
				)}
			</Card>
		</Box>
	)
}
