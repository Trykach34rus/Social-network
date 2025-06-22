import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../axiosInstance'
import { PostT, UserT } from '../../types'
import { RootState } from '../store'

type HandleRegister = {
	fullName: string
	email: string
	password: string
}

type HandleLogin = {
	username: string
	password: string
}

export enum Theme {
	LIGHT = 'light',
	DARK = 'dark',
}

interface UserState {
	userInfo: UserT | null
	accessToken: string | null
	loginError: string | null
	theme: Theme
	userId: number | null
	profile: UserT | null
	profilePosts: PostT[]
	profileLoading: boolean
	profilePostsLoading: boolean
	isMobile: boolean
}

const initialState: UserState = {
	accessToken: null,
	userInfo: null,
	loginError: null,
	theme: Theme.LIGHT,
	userId: null,
	profile: null,
	profilePosts: [],
	profileLoading: false,
	profilePostsLoading: false,
	isMobile: false,
}

const handleRegister = createAsyncThunk(
	'user/handleRegister',
	(data: HandleRegister) => {
		return axiosInstance.post('/users/add', data).then(res => res.data)
	}
)
const handleLogin = createAsyncThunk(
	'user/handleLogin',
	(data: HandleLogin) => {
		return axiosInstance.post('/user/login', data).then(res => res.data)
	}
)

const getCurrentUser = createAsyncThunk(
	'user/getCurrentUser',
	(_, { getState }) => {
		const state = getState()
		return axiosInstance
			.get('/user/me', {
				headers: {
					Authorization: `Bearer ${(state as RootState).user.accessToken}`,
				},
			})
			.then(res => res.data)
	}
)
const getUserById = createAsyncThunk('user/getUserById', (id: number) => {
	return axiosInstance.get(`/user/${id}`).then(res => res.data)
})
const getUserPostsById = createAsyncThunk(
	'user/getUserPostsById',
	(id: number) => {
		return axiosInstance.get(`/user/${id}/posts`).then(res => res.data)
	}
)

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserT>) => {
			state.userInfo = action.payload
		},
		changeTheme: state => {
			state.theme = state.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
		},
		clearToken: state => {
			state.accessToken = null
		},
		setMobile: (state, action: PayloadAction<boolean>) => {
			state.isMobile = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(handleRegister.fulfilled, (_, action) => {
			console.log(action.payload)
		})
		builder.addCase(handleRegister.rejected, (_, action) => {
			console.log(action.payload)
		})
		builder.addCase(handleLogin.fulfilled, (state, action) => {
			state.accessToken = action.payload.accessToken
			state.userInfo = action.payload
		})
		builder.addCase(handleLogin.rejected, state => {
			state.loginError = 'Incorrect username or password'
		})
		builder.addCase(getCurrentUser.fulfilled, (state, action) => {
			state.userId = action.payload.id
		})
		builder.addCase(getCurrentUser.rejected, state => {
			state.accessToken = null
		})
		builder.addCase(getUserById.pending, state => {
			state.profileLoading = true
		})
		builder.addCase(getUserById.fulfilled, (state, action) => {
			state.profile = action.payload
			state.profileLoading = false
		})
		builder.addCase(getUserPostsById.pending, state => {
			state.profilePostsLoading = true
		})
		builder.addCase(getUserPostsById.fulfilled, (state, action) => {
			state.profilePosts = action.payload.posts
			state.profilePostsLoading = false
		})
	},
})

export const { setUser, changeTheme, clearToken, setMobile } = userSlice.actions
export {
	getCurrentUser,
	getUserById,
	getUserPostsById,
	handleLogin,
	handleRegister,
}
export default userSlice.reducer
