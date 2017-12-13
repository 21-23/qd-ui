const path = require('path');

const config = {
    resolve: {
        alias: {
            react: 'preact-compat',
            'react-dom': 'preact-compat',
        },
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: [
                path.resolve(__dirname, 'src'),
            ],
        }, {
            test: /(\.(png|jpg)$)/,
            loader: 'url-loader',
        }]
    },
};

module.exports = config;
