import styles from './CartBlock.module.scss'
import CartBottom from './CartBottom'
import CartContent from './CartContent'
import CartTop from './CartTop'

export default function CartBlock() {
	return (
		<>
			<div className={styles.cart}>
				<CartTop />
				<CartContent />
				<CartBottom />
			</div>
		</>
	)
}
