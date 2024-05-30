import styles from './../components/CartBlock/CartBlock.module.scss'

import CartTop from '../components/CartBlock/CartTop'
import CartItem from '../components/CartBlock/CartItem'
import CartBottom from '../components/CartBlock/CartBottom'

import { useSelector } from 'react-redux'
import CartEmpty from '../components/CartBlock/CartEmpty'
import { selectCartReducer } from '../store/slices/cart/slice'

const Cart = () => {
	const { items } = useSelector(selectCartReducer)

	if (!items.length) {
		return <CartEmpty />
	}

	return (
		<div className={styles.cart}>
			<CartTop />
			<div className='content__cart'>
				{items.map((obj) => (
					<CartItem key={obj.id} {...obj} />
				))}
			</div>
			<CartBottom />
		</div>
	)
}

export default Cart
