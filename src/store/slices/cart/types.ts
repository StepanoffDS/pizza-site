export type CartItemProps = {
	id: number
	title: string
	price: number
	imageUrl: string
	type: string
	size: number
	count: number
}

export interface ICartSlice {
	totalPrice: number
	totalCount: number
	items: CartItemProps[]
}
