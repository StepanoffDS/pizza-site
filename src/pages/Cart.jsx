import styles from './../components/CartBlock/CartBlock.module.scss'

import CartTop from './../components/CartBlock/CartTop'
import CartItem from './../components/CartBlock/CartItem'
import CartBottom from './../components/CartBlock/CartBottom'

import { useDispatch, useSelector } from 'react-redux'
import CartEmpty from '../components/CartBlock/CartEmpty'

const Cart = () => {
	const { items } = useSelector((state) => state.cartReducer)

	if (!items.length) {
		return <CartEmpty />
	}
	console.log(styles)

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
