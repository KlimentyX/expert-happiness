import React from 'react'

import { render } from '@testing-library/react'

import { Routes, RoutesProps } from 'react-router'
import { BrowserRouter, BrowserRouterProps } from 'react-router-dom'

export const mountWithRouter = (
	children: React.ReactElement,
	browserRouterProps?: BrowserRouterProps,
) => {
	return render(<BrowserRouter {...browserRouterProps}>{children}</BrowserRouter>)
}

export const mountWithRoutes = (
	children: React.ReactElement,
	browserRouterProps?: BrowserRouterProps,
	routesProps?: RoutesProps,
) => {
	return render(
		<BrowserRouter {...browserRouterProps}>
			<Routes {...routesProps}>{children}</Routes>
		</BrowserRouter>,
	)
}
