import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axiosInstance from '../../axiosInstance'
import { FormData, PostT, Reaction, Sort } from '../../types'

interface PostsState {
	postsData: PostT[]
	tagList: string[]
	limit: number
	page: number
	maxPage: number
	postsLoading: boolean
	tagsLoading: boolean
}

const initialState: PostsState = {
	postsData: [],
	tagList: [],
	limit: 10,
	page: 1,
	maxPage: 10,
	postsLoading: false,
	tagsLoading: false,
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
const addNewPost = createAsyncThunk(
	'posts/addNewPost',
	(data: FormData & { userId: number; reactions: Reaction; views: number }) => {
		return axiosInstance.post('/posts/add', data).then(res => res.data)
	}
)
const addNewComment = createAsyncThunk(
	'posts/addNewComment',
	(data: { postId: number; userId: number; body: string; likes: number }) => {
		return axiosInstance.post('/comments/add', data).then(res => res.data)
	}
)

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
		builder.addCase(getAllPosts.pending, state => {
			state.postsLoading = true
		})
		builder.addCase(getAllPosts.fulfilled, (state, action) => {
			state.postsLoading = false
			state.postsData = action.payload.posts
			state.maxPage = Math.ceil(action.payload.total / state.limit)
		})
		builder.addCase(getAllPosts.rejected, state => {
			state.postsLoading = false
		})
		builder.addCase(getAllTags.pending, state => {
			state.tagsLoading = true
		})

		builder.addCase(getAllTags.fulfilled, (state, action) => {
			state.tagsLoading = false
			state.tagList = action.payload.slice(0, 24)
		})
		builder.addCase(getAllTags.rejected, state => {
			state.tagsLoading = false
		})
		builder.addCase(addNewPost.fulfilled, (state, action) => {
			state.postsData.unshift(action.payload)
		})
		builder.addCase(addNewComment.fulfilled, (_, action) => {
			console.log(action.payload)
		})
	},
})

export { addNewComment, addNewPost, getAllPosts, getAllTags }
export const { setLimit, setPage } = postsSlice.actions
export default postsSlice.reducer
