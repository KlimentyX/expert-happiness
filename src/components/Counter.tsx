import { useState } from 'react'

export const Counter: React.FC = () => {
	const [count, setCount] = useState(0)

	return (
		<div>
			<p data-qa='text' onClick={() => setCount(prev => prev + 1)}>
				Count: {count}
			</p>
			Example component
		</div>
	)
}
