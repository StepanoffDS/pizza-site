import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import './../App.scss'

const MainLayout = () => {
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<div className='container'>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default MainLayout
