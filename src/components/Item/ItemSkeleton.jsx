import React from 'react'
import ContentLoader from 'react-content-loader'
import styles from './Item.module.scss'

const ItemSkeleton = (props) => (
	<ContentLoader
		className={styles.item}
		speed={2}
		width={288}
		height={465}
		viewBox='0 0 288 465'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
		{...props}
	>
		<circle cx='144' cy='144' r='130' />
		<rect x='0' y='300' rx='10' ry='10' width='288' height='26' />
		<rect x='0' y='340' rx='10' ry='10' width='288' height='57' />
		<rect x='160' y='415' rx='22' ry='22' width='128' height='40' />
		<rect x='0' y='415' rx='22' ry='22' width='128' height='40' />
	</ContentLoader>
)

export default ItemSkeleton
