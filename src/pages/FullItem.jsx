import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, selectCartReducer } from '../store/slices/cartSlice'

const FullItem = () => {
	const { id: idLink } = useParams()
	const navigate = useNavigate()
	const id = Number(idLink)

	const [pizza, setPizza] = useState()
	const dispatch = useDispatch()
	const { items } = useSelector(selectCartReducer)
	const cartItem = items.find((obj) => obj.id === id)
	const addedCount = cartItem ? cartItem.count : 0

	const onClickAdd = () => {
		dispatch(addItem(pizza))
	}

	useEffect(() => {
		async function getPizza() {
			try {
				const { data } = await axios.get(
					`https://1201ac689d31d32b.mokky.dev/pizzas/${id}`
				)
				setPizza(data)
			} catch (error) {
				alert('Произошла ошибка при получении информации о пицце')
				navigate('/pizza-site/')
			}
		}
		getPizza()
	}, [])

	if (!pizza) {
		return <div>Загрузка...</div>
	}

	return (
		<div>
			<img
				src={pizza?.imageUrl}
				alt=''
				style={{ maxWidth: '300px', width: '100%' }}
			/>
			<h2 style={{ marginTop: '1rem' }}>{pizza?.title}</h2>
			<h4 style={{ marginTop: '1rem' }}>от {pizza?.price} ₽</h4>
			<div>
				<button
					style={{ marginRight: '1rem' }}
					className='button button--outline button--add'
					onClick={onClickAdd}
				>
					<svg
						width='12'
						height='12'
						viewBox='0 0 12 12'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
							fill='white'
						></path>
					</svg>
					<span>Добавить</span>
					{/* <i>{addedCount}</i> */}
					{addedCount > 0 && <i>{addedCount}</i>}
				</button>
				<Link
					to='/pizza-site/'
					className='button button--outline'
					style={{ marginTop: '2rem' }}
				>
					На главную
				</Link>
			</div>
		</div>
	)
}

export default FullItem
