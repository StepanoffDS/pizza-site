import { useState, useCallback, useRef } from 'react'
import debounce from 'lodash.debounce'
import styles from './Search.module.scss'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../store/slices/filterSlice'

const Search = () => {
	const dispatch = useDispatch()
	const [value, setValue] = useState('')
	const inputRef = useRef(null)

	const onClickClear = () => {
		dispatch(setSearchValue(''))
		setValue('')
		inputRef.current.focus()
	}

	const onChangeInput = (e) => {
		setValue(e.target.value)
		updateSearchValue(e.target.value)
	}

	const updateSearchValue = useCallback(
		debounce((str) => {
			dispatch(setSearchValue(str))
		}, 300),
		[setSearchValue, setValue]
	)

	return (
		<div className={styles.root}>
			<input
				className={styles.input}
				type='text'
				placeholder='Поиск пиццы...'
				value={value}
				onChange={onChangeInput}
				ref={inputRef}
			/>
			{value && (
				<svg
					className={styles.icon}
					xmlns='http://www.w3.org/2000/svg'
					width='1em'
					height='1em'
					viewBox='0 0 24 24'
					onClick={onClickClear}
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

export default Search
