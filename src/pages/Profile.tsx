import { ChevronLeftIcon } from '@radix-ui/react-icons'
import {
	Avatar,
	Box,
	Button,
	Card,
	Container,
	Flex,
	Heading,
	Separator,
	Skeleton,
	Text,
} from '@radix-ui/themes'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import Header from '../components/Header'
import Post from '../components/Post'
import { getUserById, getUserPostsById } from '../redux/slices/userReducer'
import { useAppDispatch, useAppSelector } from '../redux/store'

export default function Profile() {
	const { id } = useParams()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const {
		profile,
		profilePosts,
		profilePostsLoading,
		profileLoading,
		isMobile,
	} = useAppSelector(state => state.user)
	const postsSkeleton = [...new Array(4)].map((_, i) => (
		<Skeleton height={'219px'} width={'100%'} key={i}></Skeleton>
	))
	const posts = profilePosts.map(item => (
		<Post fullWidth={true} key={item.id} item={item} />
	))

	useEffect(() => {
		if (id) {
			dispatch(getUserById(+id))
			dispatch(getUserPostsById(+id))
		}
	}, [])
	return (
		<Container size='4'>
			<Header />
			<Flex align={'center'} gap={'3'} mt={'8'}>
				<Button size={'3'} onClick={() => navigate('/')}>
					<ChevronLeftIcon />
					Home
				</Button>
				<Heading size={'8'}>Profile</Heading>
			</Flex>
			<Flex
				align={'center'}
				direction={isMobile ? 'column' : 'row'}
				gap={'8'}
				mt={'8'}
			>
				<Box width={isMobile ? '100%' : '640px'}>
					<Card>
						<Flex gap='3' align='start'>
							<Skeleton loading={profileLoading}>
								<Avatar
									size='9'
									src={profile?.image}
									radius='full'
									fallback='T'
								/>
							</Skeleton>

							<Box mt={'4'}>
								<Skeleton loading={profileLoading}>
									<Text as='div' size='5' weight='bold'>
										{profile?.firstName} {profile?.lastName}
									</Text>
								</Skeleton>

								<Skeleton loading={profileLoading}>
									<Text as='div' size='3' color='gray'>
										{profile?.company.title}
									</Text>
								</Skeleton>
								<Skeleton loading={profileLoading}>
									<Text as='div' size='2' color='gray'>
										{profile?.phone}
									</Text>
								</Skeleton>
							</Box>
						</Flex>
					</Card>
				</Box>
				<Box width={'100%'}>
					<Card>
						<Skeleton loading={profileLoading}>
							<Text as='div' size='5' weight='bold'>
								{profile?.university}
							</Text>
						</Skeleton>
						<Skeleton loading={profileLoading}>
							<Text as='div' size='2' color='gray'>
								{profile?.address.country}, {profile?.address.city}
							</Text>
						</Skeleton>
						<Separator my={'4'} size={'4'} />
						<Skeleton loading={profileLoading}>
							<Text as='div' size='5' weight='bold'>
								{profile?.company.name}
							</Text>
						</Skeleton>
						<Skeleton loading={profileLoading}>
							<Text as='div' size='2' color='gray'>
								{profile?.company.address.country},{' '}
								{profile?.company.address.city},{' '}
								{profile?.company.address.address}
							</Text>
						</Skeleton>
					</Card>
				</Box>
			</Flex>
			<Flex direction={'column'} gap={'4'} mt={'8'}>
				{profilePostsLoading ? postsSkeleton : posts}
			</Flex>
		</Container>
	)
}
