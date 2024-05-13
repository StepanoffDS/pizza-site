import { Link } from 'react-router-dom'
import styles from './CartBlock.module.scss'

export default function CartBottom() {
	return (
		<div className={styles.bottom}>
			<div className={styles.details}>
				<span>
					{' '}
					Всего пицц: <b>3 шт.</b>{' '}
				</span>
				<span>
					{' '}
					Сумма заказа: <b>900 ₽</b>{' '}
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
							stroke-width='0'
							stroke-linecap='round'
							stroke-linejoin='round'
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
