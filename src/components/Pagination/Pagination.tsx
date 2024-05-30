import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

type PaginationProps = {
	onChangePage: (page: number) => void
	totalPages: number
}

const Pagination = ({ onChangePage, totalPages }: PaginationProps) => {
	return (
		<>
			<ReactPaginate
				className={styles.pagination}
				breakLabel='...'
				nextLabel='>'
				onPageChange={(event) => onChangePage(event.selected + 1)}
				pageRangeDisplayed={3}
				pageCount={totalPages}
				previousLabel='<'
				renderOnZeroPageCount={null}
			/>
		</>
	)
}

export default Pagination
