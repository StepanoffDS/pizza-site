import { useState } from 'react'
import styles from './Item.module.scss'

export default function Content({ title, price, imageUrl, sizes, types }) {
	const [activeType, setActiveType] = useState(0)
	const [activeSize, setActiveSize] = useState(0)
	const typeNames = ['тонкое', 'традиционное']

	return (
		<>
			<div className={styles.item}>
				<img className={styles.image} src={imageUrl} alt='Pizza' />
				<h4 className={styles.title}>{title}</h4>
				<div className={styles.selector}>
					<ul>
						{types.map((type) => (
							<li
								key={type}
								className={`${styles.type} ${
									activeType === type ? styles.active : ''
								}`}
								onClick={() => setActiveType(type)}
							>
								{typeNames[type]}
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
								onClick={() => setActiveSize(sizes.indexOf(size))}
							>
								{size} см.
							</li>
						))}
					</ul>
				</div>
				<div className={styles.bottom}>
					<div className={styles.price}>от {price} ₽</div>
					<button className='button button--outline button--add'>
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
						<i>0</i>
					</button>
				</div>
			</div>
		</>
	)
}
