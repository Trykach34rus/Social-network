import '@radix-ui/themes/styles.css'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import App from './App.tsx'
import { store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
)
