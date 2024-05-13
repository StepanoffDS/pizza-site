import { useContext } from 'react'
import styles from './Search.module.scss'
import { SearchContext } from '../../App'

export default function Search() {
	const { searchValue, setSearchValue } = useContext(SearchContext)

	return (
		<div className={styles.root}>
			<input
				className={styles.input}
				type='text'
				placeholder='Поиск пиццы...'
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>
			{searchValue && (
				<svg
					className={styles.icon}
					xmlns='http://www.w3.org/2000/svg'
					width='1em'
					height='1em'
					viewBox='0 0 24 24'
					onClick={() => setSearchValue('')}
				>
					<path
						fill='currentColor'
						d='m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z'
					></path>
				</svg>
			)}
		</div>
	)
}
