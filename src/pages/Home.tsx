import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'

import Sort, { sortList } from '../components/Sort/Sort'
import Categories from '../components/Categories/Categories'
import Item from '../components/Item/Item'
import ItemSkeleton from '../components/Item/ItemSkeleton'
import Pagination from '../components/Pagination/Pagination'
import {
	selectFilterReducer,
	setCurrentPage,
	setFilter,
} from '../store/slices/filter/slice'
import { selectPizzaReducer } from '../store/slices/pizzas/slice'
import { fetchPizzas } from '../store/slices/pizzas/asyncActions'
import { AppDispatch } from '../store/store'
import { SortProps } from '../store/slices/filter/types'

const Home = () => {
	const { items, status } = useSelector(selectPizzaReducer)
	const {
		categoryId,
		sort: sortIndex,
		currentPage,
		searchValue,
	} = useSelector(selectFilterReducer)
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()

	const [totalPages, setTotalPages] = useState(0)
	const isSearch = useRef(false)
	const isMounted = useRef(false)

	const category = categoryId !== 0 ? `category=${categoryId}` : ''
	const sortBy = sortIndex.sortProperty
	const pagination = `page=${currentPage}&limit=${4}`

	const getPizzas = async () => {
		dispatch(
			fetchPizzas({
				category,
				sortBy,
				pagination,
				searchValue,
			})
		)
			.then((res: any) => {
				setTotalPages(res.payload.meta?.total_pages)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page))
	}

	// Если уже был первый рендер и изменились параметры, то запрашиваем пиццы
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sortIndex.sortProperty,
				categoryId,
				currentPage,
				searchValue,
			})
			navigate(`?${queryString}`)
		}

		isMounted.current = true
	}, [categoryId, sortIndex, searchValue, currentPage])

	// Проверяем URL-параметры и сохраняем в Redux
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))

			const sort: SortProps =
				sortList.find((obj) => obj.sortProperty === params.sortProperty) ||
				sortList[0]

			dispatch(
				setFilter({
					searchValue: (params.searchValue || '').toString(),
					categoryId: Number(params.categoryId) || 0,
					currentPage: Number(params.currentPage) || 1,
					sort,
				})
			)
			isSearch.current = true
		}
	}, [])

	// Если был первый рендер, то запрашиваем пиццы
	useEffect(() => {
		if (!isSearch.current) {
			getPizzas()
		}

		isSearch.current = false

		window.scrollTo(0, 0)
	}, [categoryId, sortIndex, searchValue, currentPage])

	const skeleton = [...new Array(4)].map((_, index) => (
		<ItemSkeleton key={index} />
	))
	const pizzas = items?.items?.map((item) => <Item {...item} key={item.id} />)

	return (
		<>
			<div className='content__top'>
				<Categories categoryId={categoryId} />
				<Sort sortIndex={sortIndex} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			{status === 'error' && (
				<h3 style={{ marginTop: '2rem' }}>
					Произошла ошибка при получении пицц :(
				</h3>
			)}
			<div className='content__items'>
				{status === 'loading' ? skeleton : pizzas}
			</div>
			{status === 'success' && (
				<Pagination onChangePage={onChangePage} totalPages={totalPages} />
			)}
		</>
	)
}

export default Home
