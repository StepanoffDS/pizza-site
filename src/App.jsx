import { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import './App.scss'
import Sort from './components/Sort/Sort'
import Categories from './components/Categories/Categories'
import Item from './components/Item/Item'

function App() {
	const [pizzas, setPizzas] = useState([])

	useEffect(() => {
		fetch('https://1201ac689d31d32b.mokky.dev/pizzas')
			.then((response) => response.json())
			.then((data) => {
				setPizzas(data)
			})
	}, [])

	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<div className='container'>
					<div className='content__top'>
						<Categories />
						<Sort />
					</div>
					<h2 className='content__title'>Все пиццы</h2>
					<div className='content__items'>
						{pizzas.map((item) => (
							<Item {...item} key={item.id} />
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
