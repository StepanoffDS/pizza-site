import styles from './CartBlock.module.scss'
import CartItem from './CartItem'

export default function CartContent() {
	return (
		<div className='content__cart'>
			<CartItem />
			<CartItem />
			<CartItem />
			<CartItem />
			<CartItem />
			<CartItem />
		</div>
	)
}
