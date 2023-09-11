import { Route, Routes } from 'react-router'
import { Counter } from './components/Counter'
import './styles/main.scss'

export const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Counter />} />
		</Routes>
	)
}
