import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

import Sort, { sortList } from './../components/Sort/Sort'
import Categories from './../components/Categories/Categories'
import Item from './../components/Item/Item'
import ItemSkeleton from './../components/Item/ItemSkeleton'
import Pagination from '../components/Pagination/Pagination'
import {
	selectFilterReducer,
	setCurrentPage,
	setFilter,
} from '../store/slices/filterSlice'
import { fetchPizzas, selectPizzaReducer } from '../store/slices/pizzasSlice'

const Home = () => {
	const { items, status } = useSelector(selectPizzaReducer)
	const {
		categoryId,
		sort: sortIndex,
		currentPage,
		searchValue,
	} = useSelector(selectFilterReducer)
	const dispatch = useDispatch()
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
			.then((res) => {
				setTotalPages(res.payload.meta?.total_pages)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number))
	}

	// Если уже был первый рендер и изменились параметры, то запрашиваем пиццы
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sortIndex.sortProperty,
				categoryId,
				currentPage,
			})
			navigate(`?${queryString}`)
		}

		isMounted.current = true
	}, [categoryId, sortIndex, searchValue, currentPage])

	// Если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))

			const sort = sortList.find(
				(obj) => obj.sortProperty === params.sortProperty
			)

			dispatch(setFilter({ ...params, sort }))

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
				<Categories />
				<Sort />
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
