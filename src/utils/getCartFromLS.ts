import { CartItemProps } from '../store/slices/cart/types'
import { calcTotalCount } from './calcTotalCount'
import { calcTotalPrice } from './calcTotalPrice'

export const getCartFromLS = () => {
	const data = localStorage.getItem('cart')
	const items = data ? JSON.parse(data) : []
	const totalPrice = calcTotalPrice(items)
	const totalCount = calcTotalCount(items)

	if (items.length) {
		return {
			items: items as CartItemProps[],
			totalPrice,
			totalCount,
		}
	}
}
