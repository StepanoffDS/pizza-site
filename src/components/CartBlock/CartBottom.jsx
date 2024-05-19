import { Link } from 'react-router-dom'
import styles from './CartBlock.module.scss'

import { useDispatch, useSelector } from 'react-redux'

const CartBottom = () => {
	const { totalPrice, totalCount } = useSelector((state) => state.cartReducer)

	return (
		<div className={styles.bottom}>
			<div className={styles.details}>
				<span>
					{' '}
					Всего пицц: <b>{totalCount} шт.</b>{' '}
				</span>
				<span>
					{' '}
					Сумма заказа: <b>{totalPrice} ₽</b>{' '}
				</span>
			</div>
			<div className={styles.buttons}>
				<Link
					to='/pizza-site/'
					className='button button--outline button--add go-back-btn'
				>
					<svg
						width='8'
						height='14'
						viewBox='0 0 8 14'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M7 13L1 6.93015L6.86175 1'
							stroke='#D3D3D3'
							strokeWidth='0'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>

					<span>Вернуться назад</span>
				</Link>
				<div className='button pay-btn'>
					<span>Оплатить сейчас</span>
				</div>
			</div>
		</div>
	)
}
export default CartBottom
