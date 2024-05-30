import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { IPizzasSlice, ItemsProps, Status } from './types'
import { fetchPizzas } from './asyncActions'

const initialState: IPizzasSlice = {
	items: {
		meta: {
			total_items: 0,
			total_pages: 0,
			current_page: 0,
			per_page: 0,
			remaining_items: 0,
		},
		items: [],
	},
	status: Status.LOADING,
}

const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload.items
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.status = Status.LOADING
		})
		builder.addCase(
			fetchPizzas.fulfilled,
			(state, action: PayloadAction<ItemsProps>) => {
				state.items = action.payload
				state.status = Status.SUCCESS
			}
		)
		builder.addCase(fetchPizzas.rejected, (state) => {
			state.status = Status.ERROR
		})
	},
})

export const selectPizzaReducer = (state: RootState) => state.pizzasReducer
export const { setItems } = pizzasSlice.actions
export default pizzasSlice.reducer
