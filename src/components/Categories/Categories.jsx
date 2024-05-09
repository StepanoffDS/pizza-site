import { useState } from 'react'
import styles from './Categories.module.scss'

export default function Categories() {
	const [activeIndex, setActiveIndex] = useState(0)

	const categories = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	]

	const onClickCategory = (index) => {
		setActiveIndex(index)
	}

	return (
		<div className={styles.categories}>
			<ul>
				{categories.map((categoryName, index) => (
					<li key={categoryName}>
						<button
							onClick={() => onClickCategory(index)}
							className={`${styles.item} ${
								activeIndex === index ? styles.active : ''
							}`}
						>
							{categoryName}
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
