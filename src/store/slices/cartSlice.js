import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	totalPrice: 0,
	totalCount: 0,
	items: [],
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action) {
			const findItem = state.items.find((item) => item.id === action.payload.id)

			if (findItem) {
				findItem.count++
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				})
			}

			state.totalPrice = state.items.reduce((sum, obj) => {
				return obj.price * obj.count + sum
			}, 0)

			state.totalCount = state.items.reduce((sum, obj) => {
				return obj.count + sum
			}, 0)
		},
		removeItem(state, action) {
			state.items = state.items.filter((obj) => obj.id !== action.payload)
			state.totalPrice = state.items.reduce(
				(sum, obj) => obj.price * obj.count + sum,
				0
			)

			state.totalCount = state.items.reduce((sum, obj) => obj.count + sum, 0)
		},
		plusItem(state, action) {
			const findItem = state.items.find((item) => item.id === action.payload)

			if (findItem) {
				findItem.count++
				state.totalCount++
				state.totalPrice += findItem.price
			}
		},
		minusItem(state, action) {
			const findItem = state.items.find((item) => item.id === action.payload)

			if (findItem) {
				findItem.count--
				state.totalCount--
				state.totalPrice -= findItem.price
			}
		},
		clearCart(state, action) {
			state.items = []
			state.totalPrice = 0
			state.totalCount = 0
		},
	},
})

export const selectCartReducer = (state) => state.cartReducer

export const { addItem, removeItem, clearCart, plusItem, minusItem } =
	cartSlice.actions
export default cartSlice.reducer
