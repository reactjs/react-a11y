const path = require('path');
const webpack = require('webpack');

const resolve = path.resolve;
const join = path.join;
const root = resolve(__dirname);
const src = join(root, 'src');

module.exports = (config) => {
    config.set({
        basePath: '',

        browserNoActivityTimeout: 30000,

        browsers: ['Firefox', 'Chrome'],

        singleRun: true,

        frameworks: ['mocha'],

        plugins: [
            'karma-mocha',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-webpack',
            'karma-sourcemap-loader'
        ],

        files: [
            'test/browser/**/*.js',
            'test/*.js'
        ],

        preprocessors: {
            'test/**/*.js': ['webpack', 'sourcemap']
        },

        // , reporters: [ 'dots' ]

        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }]
            },
            resolve: {
                extensions: ['', '.js', '.jsx']
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify('test')
                })
            ]
        },

        webpackMiddleware: {
            debug: true,
            noInfo: true
        }
    });
};
