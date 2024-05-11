import { Link } from 'react-router-dom'

export default function NotFoundBlock() {
	return (
		<div style={{ textAlign: 'center' }}>
			<h2 style={{ marginBottom: '1rem' }}>Ничего не найдено</h2>
			<Link style={{ textDecoration: 'underline' }} to='/pizza-site/'>
				Вернуться назад
			</Link>
		</div>
	)
}
