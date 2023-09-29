"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack = __importStar(require("webpack"));
const fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
const webpack_merge_1 = require("webpack-merge");
const webpack_config_base_1 = __importDefault(require("./webpack.config.base"));
const devServer = {
    port: 8081,
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
};
exports.default = (0, webpack_merge_1.merge)(webpack_config_base_1.default, {
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
        new fork_ts_checker_webpack_plugin_1.default(),
    ],
    watchOptions: {
        ignored: ['node_modules/**', 'dist/**', 'coverage/**', 'cypress/**', '__tests__/**'],
    },
});
