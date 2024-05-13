import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

export default function Pagination({ setCurrentPage, amountPages }) {
	return (
		<>
			<ReactPaginate
				className={styles.pagination}
				breakLabel='...'
				nextLabel='>'
				onPageChange={(event) => setCurrentPage(event.selected + 1)}
				pageRangeDisplayed={3}
				pageCount={amountPages?.meta?.total_pages}
				previousLabel='<'
				renderOnZeroPageCount={null}
			/>
		</>
	)
}
