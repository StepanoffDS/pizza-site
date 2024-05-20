import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk(
	'pizzas/fetchPizzasStatus',
	async ({ category, sortBy, pagination, searchValue }, thunkAPI) => {
		const { data } = await axios.get(
			`https://1201ac689d31d32b.mokky.dev/pizzas?${category}&sortBy=${sortBy}&title=*${searchValue}&${pagination}`
		)

		return data
	}
)

const initialState = {
	items: [],
	status: 'loading',
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
		builder.addCase(fetchPizzas.pending, (state, action) => {
			// console.warn('Pending...')
			state.items = action.payload
			state.status = 'loading'
		})
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			// console.log('Fulfilled', action.payload)
			state.items = action.payload
			state.status = 'success'
		})
		builder.addCase(fetchPizzas.rejected, (state, action) => {
			console.error('Rejected!!!')
			state.items = action.payload
			state.status = 'error'
		})
	},
})

export const selectPizzaReducer = (state) => state.pizzasReducer
export const { setItems } = pizzasSlice.actions
export default pizzasSlice.reducer
