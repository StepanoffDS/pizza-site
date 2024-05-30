import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filter/slice'
import cartReducer from './slices/cart/slice'
import pizzasReducer from './slices/pizzas/slice'

export const store = configureStore({
	reducer: {
		filterReducer,
		cartReducer,
		pizzasReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
