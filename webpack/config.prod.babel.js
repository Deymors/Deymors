const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
        new CleanWebpackPlugin('dist', {
            root: __dirname + '/../'
        }),
        new CopyWebpackPlugin([
            {
                from: __dirname + '/../src/assets/',
                to: __dirname + '/../dist/assets/'
            }
        ]),
        new ExtractTextPlugin({
            filename: './assets/css/styles.css',
            allChunks: true
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
        filename: './assets/js/bundle.js',
    },
    plugins: getPlugins(),
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
                test: /\.(css|scss)$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {

                                url: false
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: () => [
                                    require('autoprefixer')({
                                        browsers: ['ie >= 8', 'last 4 version']
                                    }),
                                    require('cssnano')()
                                ]
                            }
                        },
                        'sass-loader'
                    ]
                })
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jpg', '.ejs', '.scss'],
    }
};
