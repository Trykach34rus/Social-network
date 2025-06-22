import {
	ExitIcon,
	MoonIcon,
	PersonIcon,
	RocketIcon,
	SunIcon,
} from '@radix-ui/react-icons'
import { Box, Button, Flex, Heading, IconButton } from '@radix-ui/themes'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import {
	changeTheme,
	clearToken,
	getCurrentUser,
	Theme,
} from '../redux/slices/userReducer'
import { useAppDispatch, useAppSelector } from '../redux/store'

export default function Header() {
	const dispatch = useAppDispatch()
	const { theme, userId } = useAppSelector(state => state.user)
	const navigate = useNavigate()
	const goProfile = () => navigate(`/profile/${userId}`)

	function handleLogout() {
		dispatch(clearToken())
		navigate('/login')
	}

	useEffect(() => {
		dispatch(getCurrentUser())
	}, [])
	return (
		<Box
			style={{
				backgroundColor: 'var(--accent-3)',
				borderRadius: 'var(--radius-5)',
			}}
			p={'3'}
		>
			<Flex justify={'between'} align={'center'}>
				<Flex align={'center'} gap={'2'}>
					<RocketIcon style={{ width: '25px', height: '25px' }} />
					<Heading>Social Network</Heading>
				</Flex>
				<Flex align={'center'} gap={'2'}>
					<Button size={'3'} onClick={goProfile}>
						<PersonIcon style={{ width: '20px', height: '20px' }} />
						Profile
					</Button>
					<IconButton
						size={'3'}
						variant='surface'
						onClick={() => dispatch(changeTheme())}
					>
						{theme === Theme.LIGHT ? (
							<SunIcon style={{ width: '20px', height: '20px' }} />
						) : (
							<MoonIcon style={{ width: '20px', height: '20px' }} />
						)}
					</IconButton>
					<IconButton size={'3'} variant='surface' onClick={handleLogout}>
						<ExitIcon style={{ width: '20px', height: '20px' }} />
					</IconButton>
				</Flex>
			</Flex>
		</Box>
	)
}
