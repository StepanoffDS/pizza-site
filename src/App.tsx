import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'

import './App.scss'
import MainLayout from './layout/MainLayout'
import { Suspense, lazy } from 'react'

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'))
const FullItem = lazy(
	() => import(/* webpackChunkName: "FullItem" */ './pages/FullItem')
)
const NotFound = lazy(
	() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound')
)

const App = () => {
	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<Routes>
				<Route path='/pizza-site/' element={<MainLayout />}>
					<Route path='' element={<Home />} />
					<Route path='cart' element={<Cart />} />
					<Route path='pizza/:id' element={<FullItem />} />
					<Route path='*' element={<NotFound />} />
				</Route>
				<Route path='*' element={<NotFound />} />
			</Routes>
		</Suspense>
	)
}

export default App
