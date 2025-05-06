import { Navigate } from 'react-router'
import { useAppSelector } from '../redux/store'

type Props = {
	children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
	const { accessToken } = useAppSelector(state => state.user)
	if (accessToken) {
		return children
	} else {
		return <Navigate to={'/login'} />
	}
}
