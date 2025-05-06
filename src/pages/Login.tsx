import {
	Blockquote,
	Box,
	Button,
	Flex,
	Heading,
	TextField,
} from '@radix-ui/themes'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router'
import { handleLogin } from '../redux/slices/userReducer'
import { useAppDispatch, useAppSelector } from '../redux/store'

type InitialValues = {
	username: string
	password: string
}

export default function Login() {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { loginError } = useAppSelector(state => state.user)

	const initialValues: InitialValues = {
		username: '',
		password: '',
	}
	const formik = useFormik({
		initialValues,
		onSubmit: values => {
			dispatch(handleLogin(values)).then(() => {
				navigate('/')
			})
		},
	})

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
					<form onSubmit={formik.handleSubmit}>
						<Heading mb={'5'} align={'center'} size={'8'}>
							Login
						</Heading>
						<Flex direction={'column'} width={'400px'} gap={'3'} mb={'5'}>
							<TextField.Root
								size='3'
								id='username'
								name='username'
								placeholder='User Name'
								type='text'
								onChange={formik.handleChange}
								value={formik.values.username}
							/>
							<TextField.Root
								size='3'
								id='password'
								name='password'
								placeholder='Password'
								type='password'
								onChange={formik.handleChange}
								value={formik.values.password}
							/>
						</Flex>
						<Flex justify={'between'} align={'center'}>
							<Blockquote>
								Don't have an account? <Link to={'/register'}>Sign up</Link>
							</Blockquote>
							<Button size={'3'} type='submit'>
								Sign in
							</Button>
						</Flex>
						{loginError && <Blockquote color='red'>{loginError}</Blockquote>}
					</form>
				</Box>
			</Flex>
		</Box>
	)
}
