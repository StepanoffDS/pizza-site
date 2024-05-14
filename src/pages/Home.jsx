import { useContext, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import Sort from './../components/Sort/Sort'
import Categories from './../components/Categories/Categories'
import Item from './../components/Item/Item'
import ItemSkeleton from './../components/Item/ItemSkeleton'
import Pagination from '../components/Pagination/Pagination'
import { SearchContext } from '../App'

export default function Home() {
	const { categoryId: categoryIndex, sort: sortIndex } = useSelector(
		(state) => state.filterReducer
	)

	const { searchValue } = useContext(SearchContext)
	const [isLoading, setIsLoading] = useState(true)
	const [pizzas, setPizzas] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [amountPages, setAmountPages] = useState(0)

	const category = categoryIndex !== 0 ? `category=${categoryIndex}` : ''
	const sortBy = sortIndex.sortProperty
	const pagination = `page=${currentPage}&limit=${4}`

	useEffect(() => {
		setIsLoading(true)
		fetch(
			`https://1201ac689d31d32b.mokky.dev/pizzas?${category}&sortBy=${sortBy}&title=*${searchValue}&${pagination}`
		)
			.then((response) => response.json())
			.then((data) => {
				setPizzas(data)
				setAmountPages(data)
				setIsLoading(false)
			})
		window.scrollTo(0, 0)
	}, [categoryIndex, sortIndex, searchValue, currentPage])

	const skeleton = [...new Array(6)].map((_, index) => (
		<ItemSkeleton key={index} />
	))
	const items = pizzas.items?.map((item) => <Item {...item} key={item.id} />)

	return (
		<>
			<div className='content__top'>
				<Categories />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>{isLoading ? skeleton : items}</div>
			<Pagination
				setCurrentPage={(number) => setCurrentPage(number)}
				amountPages={amountPages}
			/>
		</>
	)
}
