import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { getCartFromLS } from '../../../utils/getCartFromLS'
import { calcTotalPrice } from '../../../utils/calcTotalPrice'
import { calcTotalCount } from '../../../utils/calcTotalCount'
import { CartItemProps, ICartSlice } from './types'

const cartData = getCartFromLS()

const initialState: ICartSlice = {
	totalPrice: cartData?.totalPrice || 0,
	totalCount: cartData?.totalCount || 0,
	items: cartData?.items || [],
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItemProps>) {
			const findItem = state.items.find((item) => item.id === action.payload.id)

			if (findItem) {
				findItem.count++
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				})
			}

			state.totalPrice = calcTotalPrice(state.items)

			state.totalCount = calcTotalCount(state.items)
		},
		removeItem(state, action: PayloadAction<number>) {
			state.items = state.items.filter((obj) => obj.id !== action.payload)
			state.totalPrice = calcTotalPrice(state.items)

			state.totalCount = calcTotalCount(state.items)
		},
		plusItem(state, action: PayloadAction<number>) {
			const findItem = state.items.find((item) => item.id === action.payload)

			if (findItem) {
				findItem.count++
				state.totalCount++
				state.totalPrice += findItem.price
			}
		},
		minusItem(state, action: PayloadAction<number>) {
			const findItem = state.items.find((item) => item.id === action.payload)

			if (findItem) {
				findItem.count--
				state.totalCount--
				state.totalPrice -= findItem.price
			}
		},
		clearCart(state) {
			state.items = []
			state.totalPrice = 0
			state.totalCount = 0
		},
	},
})

export const selectCartReducer = (state: RootState) => state.cartReducer

export const { addItem, removeItem, clearCart, plusItem, minusItem } =
	cartSlice.actions
export default cartSlice.reducer
