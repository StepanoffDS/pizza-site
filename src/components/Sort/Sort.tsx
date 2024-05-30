import { memo, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSortType } from '../../store/slices/filter/slice'
import styles from './Sort.module.scss'
import { SortProps, SortPropsNames } from '../../store/slices/filter/types'

export const sortList: SortProps[] = [
	{
		name: 'популярности',
		sortProperty: SortPropsNames.RATING,
	},
	{
		name: 'цене',
		sortProperty: SortPropsNames.PRICE,
	},
	{
		name: 'алфавиту',
		sortProperty: SortPropsNames.TITLE,
	},
]

const Sort = memo(({ sortIndex }: { sortIndex: SortProps }) => {
	const dispatch = useDispatch()

	const [isVisiblePopup, setIsVisiblePopup] = useState(false)
	const selectedItem = sortIndex.name

	const onClickListItem = (obj: SortProps) => {
		dispatch(setSortType(obj))
	}

	function closePopup(e: MouseEvent) {
		e.stopPropagation()
		setIsVisiblePopup(false)
	}

	useEffect(() => {
		document.addEventListener('click', closePopup)
		return () => document.removeEventListener('click', closePopup)
	}, [isVisiblePopup])

	useEffect(() => {}, [])

	return (
		<div className={styles.sorting}>
			<button
				onClick={(e) => {
					e.stopPropagation()
					setIsVisiblePopup(!isVisiblePopup)
				}}
				className={styles.label}
			>
				<svg
					width='10'
					height='6'
					viewBox='0 0 10 6'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
						fill='#2C2C2C'
					></path>
				</svg>
				<b>Сортировка по:</b>
				<span>{selectedItem}</span>
			</button>
			{isVisiblePopup && (
				<div className={styles.popup}>
					<ul>
						{sortList.map((obj, index) => (
							<li key={index}>
								<button
									className={`${styles.item} ${
										sortIndex.sortProperty === obj.sortProperty
											? styles.active
											: ''
									}`}
									onClick={() => onClickListItem(obj)}
								>
									{obj.name}
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
})

export default Sort
