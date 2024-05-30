import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { IFilterSlice, SortProps, SortPropsNames } from './types'

const initialState: IFilterSlice = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности',
		sortProperty: SortPropsNames.RATING,
	},
}

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload
		},
		setCategoryId: (state, action: PayloadAction<number>) => {
			state.categoryId = action.payload
		},
		setSortType: (state, action: PayloadAction<SortProps>) => {
			state.sort = action.payload
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload
		},
		setFilter: (state, action: PayloadAction<IFilterSlice>) => {
			state.currentPage = action.payload.currentPage
			state.categoryId = action.payload.categoryId
			state.searchValue = action.payload.searchValue
			state.sort = action.payload.sort
		},
	},
})

export const selectFilterReducer = (state: RootState) => state.filterReducer

export const {
	setCategoryId,
	setSortType,
	setCurrentPage,
	setFilter,
	setSearchValue,
} = filterSlice.actions
export default filterSlice.reducer
