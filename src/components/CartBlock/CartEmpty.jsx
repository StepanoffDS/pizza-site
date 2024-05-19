import { Link } from 'react-router-dom'
import emptyCartIcon from './../../assets/img/empty-cart.png'
import styles from './CartBlock.module.scss'

const CartEmpty = () => {
	return (
		<div className={`${styles.cart} ${styles.empty}`}>
			<h2>
				Корзина пустая <span>😕</span>
			</h2>
			<p>
				Вероятней всего, вы не заказывали ещё пиццу.
				<br />
				Для того, чтобы заказать пиццу, перейди на главную страницу.
			</p>
			<img src={emptyCartIcon} alt='Empty cart' />
			<Link to='/pizza-site/' className='button button--black'>
				<span>Вернуться назад</span>
			</Link>
		</div>
	)
}

export default CartEmpty
