import { Theme } from '@radix-ui/themes'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import Register from './pages/Register'
import { setMobile } from './redux/slices/userReducer'
import { useAppDispatch, useAppSelector } from './redux/store'

function App() {
	const dispatch = useAppDispatch()
	useEffect(() => {
		const changeMobile = () => {
			if (window.innerWidth < 950) {
				dispatch(setMobile(true))
			} else {
				dispatch(setMobile(false))
			}
		}
		window.addEventListener('resize', changeMobile)
		return () => {
			window.removeEventListener('resize', changeMobile)
		}
	}, [])
	const { theme } = useAppSelector(state => state.user)
	return (
		<Theme accentColor='grass' grayColor='slate' appearance={theme}>
			<Routes>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				/>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route
					path='/profile/:id'
					element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					}
				/>
				<Route path='*' element={<NotFound />} />
			</Routes>
		</Theme>
	)
}

export default App
