import { Theme } from '@radix-ui/themes'
import { Route, Routes } from 'react-router'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import Register from './pages/Register'
import { useAppSelector } from './redux/store'

function App() {
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
					path='/profile'
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
