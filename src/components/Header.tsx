import {
	MoonIcon,
	PersonIcon,
	RocketIcon,
	SunIcon,
} from '@radix-ui/react-icons'
import { Box, Button, Flex, Heading, IconButton } from '@radix-ui/themes'
import { changeTheme, Theme } from '../redux/slices/userReducer'
import { useAppDispatch, useAppSelector } from '../redux/store'

type Props = {}

export default function Header({}: Props) {
	const dispatch = useAppDispatch()
	const { theme } = useAppSelector(state => state.user)
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
					<Button size={'3'}>
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
				</Flex>
			</Flex>
		</Box>
	)
}
