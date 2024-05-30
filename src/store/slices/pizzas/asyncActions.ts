import { FetchPizzasArgs, ItemsProps } from './types'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk<ItemsProps, FetchPizzasArgs>(
	'pizzas/fetchPizzasStatus',
	async (params) => {
		const { category, sortBy, pagination, searchValue } = params
		const { data } = await axios.get<ItemsProps>(
			`https://1201ac689d31d32b.mokky.dev/pizzas?${category}&sortBy=${sortBy}&title=*${searchValue}&${pagination}`
		)

		return data
	}
)
