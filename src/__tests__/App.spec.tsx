import React from 'react'
import { mountWithRouter } from '../utils/mount'
import { screen } from '@testing-library/react'
import { App } from '../App'

describe('<App />', () => {
	it('renders the app', () => {
		mountWithRouter(<App />)
		expect(screen.getByText('Count')).toBeInTheDocument()
	})
})
