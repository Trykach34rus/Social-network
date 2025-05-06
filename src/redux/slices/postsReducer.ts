import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axiosInstance from '../../axiosInstance'
import { PostT, Sort } from '../../types'

interface PostsState {
	postsData: PostT[]
	tagList: string[]
	limit: number
	page: number
	maxPage: number
}

const initialState: PostsState = {
	postsData: [],
	tagList: [],
	limit: 10,
	page: 1,
	maxPage: 10,
}

const getAllPosts = createAsyncThunk(
	'posts/getAllPosts',
	(props: {
		limit: number
		skip: number
		search: string
		tag: string
		sort: Sort
	}) => {
		let url = '/posts'
		if (props.search) {
			url += `/search?q=${props.search}`
			return axiosInstance.get(url).then(res => res.data)
		}

		if (props.tag) {
			url += `/tag/${props.tag}`
		}
		url += `?limit=${props.limit}&skip=${props.skip}`
		url += `&sortBy=${props.sort.sortBy}&order=${props.sort.order}`

		return axiosInstance.get(url).then(res => res.data)
	}
)
const getAllTags = createAsyncThunk('posts/getAllTags', () => {
	return axiosInstance.get('/posts/tag-list').then(res => res.data)
})

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		setLimit: (state, action: PayloadAction<number>) => {
			state.limit = action.payload
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(getAllPosts.fulfilled, (state, action) => {
			console.log(action.payload)
			state.postsData = action.payload.posts
			state.maxPage = Math.ceil(action.payload.total / state.limit)
		})
		builder.addCase(getAllPosts.rejected, (state, acion) => {
			console.log(acion.payload)
		})
		builder.addCase(getAllTags.fulfilled, (state, action) => {
			console.log(action.payload)
			state.tagList = action.payload.slice(0, 24)
		})
		builder.addCase(getAllTags.rejected, (state, acion) => {
			console.log(acion.payload)
		})
	},
})

export { getAllPosts, getAllTags }
export const { setLimit, setPage } = postsSlice.actions
export default postsSlice.reducer
