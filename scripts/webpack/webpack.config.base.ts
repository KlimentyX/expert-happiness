import * as webpack from 'webpack'
import * as path from 'node:path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer'

export default {
	mode: 'production',
	target: 'web',
	entry: './src/index.tsx',
	bail: true,
	devtool: false,
	performance: {
		hints: 'warning',
	},
	module: {
		rules: [
			{ test: /\.svg/, type: 'asset/inline' },
			{
				test: /\.(png|jpe?g|gif|woff|woff2?|eot|ttf|otf|webp|avif)$/i,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/public/index.html',
			title: 'Webpack template',
			filename: 'index.html',
			favicon: './src/assets/React-icon.png',
			cache: true,
		}),
		new BundleAnalyzerPlugin.BundleAnalyzerPlugin({ openAnalyzer: false }),
		new webpack.ProvidePlugin({ React: 'react' }),
	],
	output: {
		filename: '[name].[contenthash].js',
		asyncChunks: true,
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	resolve: {
		extensions: ['.tsx', '.ts', '...'],
	},
} as webpack.Configuration
