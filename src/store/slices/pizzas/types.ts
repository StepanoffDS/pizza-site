export type FetchPizzasArgs = Record<string, string>

export type MetaProps = {
	total_items: number
	total_pages: number
	current_page: number
	per_page: number
	remaining_items: number
}

export type PizzaProps = {
	id: number
	imageUrl: string
	title: string
	sizes: number[]
	types: number[]
	price: number
	category: number
	rating: number
}

export type ItemsProps = {
	meta: MetaProps
	items: PizzaProps[]
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export interface IPizzasSlice {
	items: ItemsProps
	status: Status
}
