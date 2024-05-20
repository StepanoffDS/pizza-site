import { useState } from 'react'
import styles from './Item.module.scss'
import { useDispatch, useSelector } from 'react-redux'

import { addItem, selectCartReducer } from '../../store/slices/cartSlice'
import { Link } from 'react-router-dom'

const Content = ({ id, title, price, imageUrl, sizes, types }) => {
	const dispatch = useDispatch()
	const { items } = useSelector(selectCartReducer)
	const cartItem = items.find((obj) => obj.id === id)
	const addedCount = cartItem ? cartItem.count : 0

	const [activeType, setActiveType] = useState(0)
	const [activeSize, setActiveSize] = useState(0)
	const typeNames = ['тонкое', 'традиционное']

	const onClickAdd = () => {
		const item = {
			id,
			title,
			price,
			imageUrl,
			type: typeNames[activeType],
			size: sizes[activeSize],
		}

		dispatch(addItem(item))
	}

	return (
		<div className={styles.item}>
			<Link to={`/pizza-site/pizza/${id}`}>
				<img className={styles.image} src={imageUrl} alt='Pizza' />
			</Link>
			<h4 className={styles.title}>{title}</h4>
			<div className={styles.selector}>
				<ul>
					{types.map((type) => (
						<li
							key={type}
							className={`${styles.type} ${
								types.indexOf(type) === activeType ? styles.active : ''
							}`}
						>
							<button onClick={() => setActiveType(type)}>
								{typeNames[type]}
							</button>
						</li>
					))}
				</ul>
				<ul>
					{sizes.map((size) => (
						<li
							key={size}
							className={`${styles.type} ${
								sizes.indexOf(size) === activeSize ? styles.active : ''
							}`}
						>
							<button onClick={() => setActiveSize(sizes.indexOf(size))}>
								{size} см.
							</button>
						</li>
					))}
				</ul>
			</div>
			<div className={styles.bottom}>
				<div className={styles.price}>от {price} ₽</div>
				<button
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
			</div>
		</div>
	)
}
export default Content
