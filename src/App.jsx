import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'
import Header from './components/Header/Header'

import './App.scss'

export default function App() {
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<div className='container'>
					<Routes>
						<Route path='/pizza-site/' element={<Home />} />
						<Route path='/pizza-site/cart' element={<Cart />} />
						<Route path='/pizza-site/*' element={<NotFound />} />
					</Routes>
				</div>
			</div>
		</div>
	)
}
