import { useEffect, useState } from 'react'

import Sort from './../components/Sort/Sort'
import Categories from './../components/Categories/Categories'
import Item from './../components/Item/Item'
import ItemSkeleton from './../components/Item/ItemSkeleton'

export default function Home() {
	const [isLoading, setIsLoading] = useState(true)
	const [pizzas, setPizzas] = useState([])

	useEffect(() => {
		fetch('https://1201ac689d31d32b.mokky.dev/pizzas')
			.then((response) => response.json())
			.then((data) => {
				setPizzas(data)
				setIsLoading(false)
			})
		window.scrollTo(0, 0)
	}, [])
	return (
		<>
			<div className='content__top'>
				<Categories />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{isLoading
					? [...new Array(6)].map((_, index) => <ItemSkeleton key={index} />)
					: pizzas?.map((item) => <Item {...item} key={item.id} />)}
			</div>
		</>
	)
}
