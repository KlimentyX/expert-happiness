import * as webpack from 'webpack'
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

import { merge } from 'webpack-merge'
import Base from './webpack.config.base'

const devServer: DevServerConfiguration = {
	port: 8080,
	historyApiFallback: false,
	client: {
		logging: 'verbose',
		overlay: true,
		progress: true,
		reconnect: 5,
	},
	proxy: {},
	open: true,
	http2: true,
	compress: true,
}

export default merge(Base, {
	mode: 'development',
	devtool: 'source-map',
	performance: false,
	devServer,
	stats: 'normal',
	cache: {
		type: 'memory',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: { sourceMap: true, modules: true },
					},
					'postcss-loader',
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: { sourceMap: true, modules: true },
					},
					{ loader: 'sass-loader', options: { sourceMap: true } },
					'postcss-loader',
				],
			},
			{
				test: /\.(tsx|ts)/,
				exclude: /node_modules/,
				use: [{ loader: 'esbuild-loader' }],
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({ MODE: JSON.stringify('development') }),
		new ForkTsCheckerWebpackPlugin(),
	],
	watchOptions: {
		ignored: ['node_modules/**', 'dist/**', 'coverage/**', 'cypress/**', '__tests__/**'],
	},
} as webpack.Configuration)
