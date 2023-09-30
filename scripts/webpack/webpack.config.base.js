'use strict'
var __createBinding =
	(this && this.__createBinding) ||
	(Object.create
		? function (o, m, k, k2) {
				if (k2 === undefined) k2 = k
				var desc = Object.getOwnPropertyDescriptor(m, k)
				if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
					desc = {
						enumerable: true,
						get: function () {
							return m[k]
						},
					}
				}
				Object.defineProperty(o, k2, desc)
		  }
		: function (o, m, k, k2) {
				if (k2 === undefined) k2 = k
				o[k2] = m[k]
		  })
var __setModuleDefault =
	(this && this.__setModuleDefault) ||
	(Object.create
		? function (o, v) {
				Object.defineProperty(o, 'default', { enumerable: true, value: v })
		  }
		: function (o, v) {
				o['default'] = v
		  })
var __importStar =
	(this && this.__importStar) ||
	function (mod) {
		if (mod && mod.__esModule) return mod
		var result = {}
		if (mod != null)
			for (var k in mod)
				if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
					__createBinding(result, mod, k)
		__setModuleDefault(result, mod)
		return result
	}
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod }
	}
Object.defineProperty(exports, '__esModule', { value: true })
const webpack = __importStar(require('webpack'))
const path = __importStar(require('node:path'))
const html_webpack_plugin_1 = __importDefault(require('html-webpack-plugin'))
const webpack_bundle_analyzer_1 = __importDefault(require('webpack-bundle-analyzer'))
exports.default = {
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
		new html_webpack_plugin_1.default({
			template: './src/public/index.html',
			title: 'Webpack template',
			filename: 'index.html',
			favicon: './src/assets/React-icon.png',
			cache: true,
		}),
		new webpack_bundle_analyzer_1.default.BundleAnalyzerPlugin({ openAnalyzer: false }),
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
}
