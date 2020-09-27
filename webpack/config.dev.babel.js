const express = require('express');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const data = require('../data/data.json');

const getEntries = () => {
    const entries = [
        './src/js/app.js',
        './src/scss/app.scss'
    ];
    return entries;
};

const getPlugins = () => {
    const plugins = [
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin({
            clearConsole: true,
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/index.ejs',
            templateParameters: {
                'data':data
            }
        }),
    ];

    return plugins;
};

module.exports = {
    entry: getEntries(),
    output: {
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: './src/templates',
        watchContentBase: true,
        hot: true,
        open: true,
        inline: true,
        quiet: true,
        historyApiFallback: true,
        before: function (app) {
            app.use('/assets', express.static('./src/assets'));
            app.use('/img', express.static('./src/assets/img'));
        }
    },
    plugins: getPlugins(),
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ejs$/,
                loader: 'ejs-loader',
                options: {
                    esModule: false
                }
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                }
            },
            {
                test: /\.(css|scss)$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            url: false
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: true,
                            plugins: () => [
                                require('autoprefixer')({
                                    browsers: ['ie >= 8', 'last 4 version']
                                }),
                            ]
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jpg', '.ejs', '.scss'],
    },
};
