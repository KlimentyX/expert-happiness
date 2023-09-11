import React from 'react'

import { render } from '@testing-library/react'

import { Routes, RoutesProps } from 'react-router'
import { BrowserRouter, BrowserRouterProps } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from 'src/redux/store'

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

export const mountWithStore = (
	children: React.ReactElement,
	predefinedState?: ReturnType<typeof store.getState>,
) => {
	return <Provider store={predefinedState}>{children}</Provider>
}

export const mountWithStoreAndRouter = (
	children: React.ReactElement,
	predefinedState?: ReturnType<typeof store.getState>,
	browserRouterProps?: BrowserRouterProps,
	routesProps?: RoutesProps,
) => {
	return (
		<Provider store={predefinedState}>
			<BrowserRouter {...browserRouterProps}>
				<Routes {...routesProps}>{children}</Routes>
			</BrowserRouter>
		</Provider>
	)
}
