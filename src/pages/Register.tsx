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
import { handleRegister } from '../redux/slices/userReducer'
import { useAppDispatch } from '../redux/store'

type InitialValues = {
	fullName: string
	email: string
	password: string
}

export default function Register() {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const initialValues: InitialValues = {
		fullName: '',
		email: '',
		password: '',
	}
	const formik = useFormik({
		initialValues,
		onSubmit: values => {
			dispatch(handleRegister(values)).then(() => {
				navigate('/login')
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
							Register
						</Heading>
						<Flex direction={'column'} width={'400px'} gap={'3'} mb={'5'}>
							<TextField.Root
								size='3'
								id='fullName'
								name='fullName'
								placeholder='Full name'
								onChange={formik.handleChange}
								value={formik.values.fullName}
							/>
							<TextField.Root
								size='3'
								id='email'
								name='email'
								placeholder='Email'
								type='email'
								onChange={formik.handleChange}
								value={formik.values.email}
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
								Have an account? <Link to={'/login'}>Sign in</Link>
							</Blockquote>
							<Button size={'3'} type='submit'>
								Sign up
							</Button>
						</Flex>
					</form>
				</Box>
			</Flex>
		</Box>
	)
}
