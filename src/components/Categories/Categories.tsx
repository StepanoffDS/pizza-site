import React from 'react'
import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { setCategoryId } from '../../store/slices/filter/slice'

import styles from './Categories.module.scss'

const categories: string[] = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые',
]

const Categories = memo(({ categoryId }: { categoryId: number }) => {
	const dispatch = useDispatch()

	return (
		<div className={styles.categories}>
			<ul>
				{categories.map((categoryName, index) => (
					<li key={categoryName}>
						<button
							onClick={() => dispatch(setCategoryId(index))}
							className={`${styles.item} ${
								categoryId === index ? styles.active : ''
							}`}
						>
							{categoryName}
						</button>
					</li>
				))}
			</ul>
		</div>
	)
})

export default Categories
