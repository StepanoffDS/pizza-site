import styles from './Categories.module.scss'

export default function Categories({ value, onClickCategory }) {
	const categories = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	]

	return (
		<div className={styles.categories}>
			<ul>
				{categories.map((categoryName, index) => (
					<li key={categoryName}>
						<button
							onClick={() => onClickCategory(index)}
							className={`${styles.item} ${
								value === index ? styles.active : ''
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
