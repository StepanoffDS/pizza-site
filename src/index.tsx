import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import { store } from './store/store'
import { Provider } from 'react-redux'

const rootElem = document.getElementById('root')
const root = ReactDOM.createRoot(rootElem!)
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
)
