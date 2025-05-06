import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Sort } from '../../types'

interface FilterState {
	search: string
	tag: string
	sort: Sort
}

const initialState: FilterState = {
	search: '',
	tag: '',
	sort: {
		sortBy: 'id',
		order: 'asc',
		id: 1,
		name: 'Default',
	},
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload
		},
		setTag: (state, action: PayloadAction<string>) => {
			state.tag = action.payload
		},
		setSort: (state, action: PayloadAction<Sort>) => {
			state.sort = action.payload
		},
		clearFilters: state => {
			state.search = ''
			state.tag = ''
			state.sort = { sortBy: 'id', order: 'asc', id: 1, name: 'Default' }
		},
	},
})

export const { setSearch, setTag, setSort, clearFilters } = filterSlice.actions
export default filterSlice.reducer
