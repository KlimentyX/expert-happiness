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
const mini_css_extract_plugin_1 = __importDefault(require('mini-css-extract-plugin'))
const webpack_manifest_plugin_1 = require('webpack-manifest-plugin')
const css_minimizer_webpack_plugin_1 = __importDefault(require('css-minimizer-webpack-plugin'))
const html_minimizer_webpack_plugin_1 = __importDefault(require('html-minimizer-webpack-plugin'))
const webpack_merge_1 = require('webpack-merge')
const webpack_config_base_1 = __importDefault(require('./webpack.config.base'))
exports.default = (0, webpack_merge_1.merge)(webpack_config_base_1.default, {
	mode: 'production',
	stats: 'detailed',
	cache: {
		type: 'filesystem',
		name: 'ProdCache',
		maxAge: 1000 * 60 * 60 * 24 * 2,
		compression: false,
	},
	optimization: {
		minimizer: [new css_minimizer_webpack_plugin_1.default()],
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
					mini_css_extract_plugin_1.default.loader,
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
					mini_css_extract_plugin_1.default.loader,
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
		new webpack_manifest_plugin_1.WebpackManifestPlugin({ fileName: 'runtime' }),
		new webpack.ProgressPlugin(),
		new mini_css_extract_plugin_1.default({ filename: '[name].[contenthash].css' }),
		new html_minimizer_webpack_plugin_1.default({
			minify: html_minimizer_webpack_plugin_1.default.swcMinify,
		}),
	],
})
