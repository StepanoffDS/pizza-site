import { Routes, Route, Outlet } from 'react-router-dom'

import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'
import Header from './components/Header/Header'
import FullItem from './pages/FullItem'

import './App.scss'
import MainLayout from './layout/MainLayout'

const App = () => {
	return (
		<Routes>
			<Route path='/pizza-site/' element={<MainLayout />}>
				<Route path='' element={<Home />} />
				<Route path='cart' element={<Cart />} />
				<Route path='pizza/:id' element={<FullItem />} />
				<Route path='*' element={<NotFound />} />
			</Route>
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}

export default App
