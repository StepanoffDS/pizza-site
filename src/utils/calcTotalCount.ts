import { CartItemProps } from '../store/slices/cart/types'

export const calcTotalCount = (items: CartItemProps[]) => {
	return items.reduce((sum, obj) => obj.count + sum, 0)
}
