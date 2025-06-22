import { Box, Button, Flex, Heading } from '@radix-ui/themes'
import { useNavigate } from 'react-router'

export default function NotFound() {
	const navigate = useNavigate()
	const goHome = () => navigate('/')
	return (
		<Box height={'100vh'}>
			<Flex
				height={'100%'}
				direction={'column'}
				align={'center'}
				justify={'center'}
			>
				<Box
					style={{
						backgroundColor: 'var(--accent-3)',
						borderRadius: 'var(--radius-5)',
					}}
					p={'6'}
				>
					<Heading mb={'9'} align={'center'} size={'8'}>
						Page Not Found
					</Heading>
					<Flex justify={'center'}>
						<Button size={'3'} onClick={goHome}>
							Go Home
						</Button>
					</Flex>
				</Box>
			</Flex>
		</Box>
	)
}
