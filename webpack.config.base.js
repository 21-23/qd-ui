const path = require('path');

const config = {
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
