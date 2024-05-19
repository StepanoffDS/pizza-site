import { useDispatch, useSelector } from 'react-redux'
import { setCategoryId } from '../../store/slices/filterSlice'

import styles from './Categories.module.scss'

const categories = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые',
]

const Categories = () => {
	const dispatch = useDispatch()
	const categoryIndex = useSelector((state) => state.filterReducer.categoryId)

	return (
		<div className={styles.categories}>
			<ul>
				{categories.map((categoryName, index) => (
					<li key={categoryName}>
						<button
							onClick={() => dispatch(setCategoryId(index))}
							className={`${styles.item} ${
								categoryIndex === index ? styles.active : ''
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

export default Categories
