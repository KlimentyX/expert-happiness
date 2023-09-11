import * as webpack from 'webpack'
import MiniCSSExtractPlugin from 'mini-css-extract-plugin'
import { WebpackManifestPlugin } from 'webpack-manifest-plugin'
import CSSminimizer from 'css-minimizer-webpack-plugin'
import HtmlMinimizerPlugin from 'html-minimizer-webpack-plugin'

import { merge } from 'webpack-merge'
import Base from './webpack.config.base'

export default merge(Base, {
	mode: 'production',
	stats: 'detailed',
	cache: {
		type: 'filesystem',
		name: 'ProdCache',
		maxAge: 1000 * 60 * 60 * 24 * 2,
		compression: false,
	},
	optimization: {
		minimizer: [new CSSminimizer()],
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'vendor',
					test: /[\\/]node_modules[\\/]/,
					chunks: 'all',
				},
				runtimeChunk: { name: 'runtime' },
				main: {
					name: 'main',
					chunks: 'initial',
				},
				lazy: {
					name: 'lazy',
					chunks: 'async',
				},
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCSSExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { sourceMap: false, modules: true },
					},
					'postcss-loader',
					{ loader: 'sass-loader', options: { sourceMap: true } },
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCSSExtractPlugin.loader,
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
				use: [{ loader: 'ts-loader' }],
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({ MODE: JSON.stringify('production') }),
		new WebpackManifestPlugin({ fileName: 'runtime' }),
		new webpack.ProgressPlugin(),
		new MiniCSSExtractPlugin({ filename: '[name].[contenthash].css' }),
		new HtmlMinimizerPlugin({ minify: HtmlMinimizerPlugin.swcMinify }),
	],
} as webpack.Configuration)
