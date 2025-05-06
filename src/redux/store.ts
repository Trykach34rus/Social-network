import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import filterReducer from './slices/filterReducer'
import postsReducer from './slices/postsReducer'
import userReducer from './slices/userReducer'

const preloadedState = localStorage.getItem('social-network')
	? JSON.parse(localStorage.getItem('social-network') as string)
	: {}

export const store = configureStore({
	reducer: {
		//@ts-expect-error Я художник я так вижу, мне похуй
		user: userReducer,
		posts: postsReducer,
		filter: filterReducer,
	},
	preloadedState,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

store.subscribe(() => {
	localStorage.setItem('social-network', JSON.stringify(store.getState()))
})
