import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../axiosInstance'

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
	userInfo: any
	accessToken: string | null
	loginError: string | null
	theme: Theme
}

const initialState: UserState = {
	accessToken: null,
	userInfo: null,
	loginError: null,
	theme: Theme.LIGHT,
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

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<any>) => {
			state.userInfo = action.payload
		},
		changeTheme: state => {
			state.theme = state.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
		},
	},
	extraReducers: builder => {
		builder.addCase(handleRegister.fulfilled, (state, action) => {
			console.log(action.payload)
		})
		builder.addCase(handleRegister.rejected, (state, acion) => {
			console.log(acion.payload)
		})
		builder.addCase(handleLogin.fulfilled, (state, action) => {
			state.accessToken = action.payload.accessToken
		})
		builder.addCase(handleLogin.rejected, (state, acion) => {
			state.loginError = 'Incorrect username or password'
		})
	},
})

export const { setUser, changeTheme } = userSlice.actions
export { handleLogin, handleRegister }
export default userSlice.reducer
