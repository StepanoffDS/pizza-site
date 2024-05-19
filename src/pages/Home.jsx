import { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

import Sort, { sortList } from './../components/Sort/Sort'
import Categories from './../components/Categories/Categories'
import Item from './../components/Item/Item'
import ItemSkeleton from './../components/Item/ItemSkeleton'
import Pagination from '../components/Pagination/Pagination'
import { SearchContext } from '../App'
import { setCurrentPage, setFilter } from '../store/slices/filterSlice'

const Home = () => {
	const {
		categoryId,
		sort: sortIndex,
		currentPage,
	} = useSelector((state) => state.filterReducer)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const isMounted = useRef(false)

	const { searchValue } = useContext(SearchContext)
	const [isLoading, setIsLoading] = useState(true)
	const [pizzas, setPizzas] = useState([])
	const [totalPages, setTotalPages] = useState(0)
	const isSearch = useRef(false)

	const category = categoryId !== 0 ? `category=${categoryId}` : ''
	const sortBy = sortIndex.sortProperty
	const pagination = `page=${currentPage}&limit=${4}`

	const fetchPizzas = async () => {
		setIsLoading(true)

		try {
			const res = await axios.get(
				`https://1201ac689d31d32b.mokky.dev/pizzas?${category}&sortBy=${sortBy}&title=*${searchValue}&${pagination}`
			)
			setPizzas(res.data)
			setTotalPages(res.data.meta.total_pages)
		} catch (error) {
			console.log(`Error: ${error}`)
			alert('Ошибка при получении пицц')
		} finally {
			setIsLoading(false)
		}
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
			fetchPizzas()
		}

		isSearch.current = false

		window.scrollTo(0, 0)
	}, [categoryId, sortIndex, searchValue, currentPage])

	const skeleton = [...new Array(4)].map((_, index) => (
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
			<Pagination onChangePage={onChangePage} totalPages={totalPages} />
		</>
	)
}

export default Home
