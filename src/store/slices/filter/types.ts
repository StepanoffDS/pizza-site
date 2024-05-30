export enum SortPropsNames {
	RATING = 'rating',
	PRICE = 'price',
	TITLE = 'title',
}

export type SortProps = {
	name: string
	sortProperty: SortPropsNames
}

export interface IFilterSlice {
	searchValue: string
	categoryId: number
	currentPage: number
	sort: SortProps
}
