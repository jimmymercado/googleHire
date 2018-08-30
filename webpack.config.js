
const path = require('path');

module.exports = {
    entry:{
        main:['./node_modules/whatwg-fetch', './node_modules/promise-polyfill', './js-es6/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'pub'),
        filename: 'js/[name].bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.js?$/,
                exclude:[path.resolve(__dirname, 'node_modules')],
                use:{
                    loader: 'babel-loader',
                    options: {
                        presets: ["env"]
                    }
                }
            }
        ]
    }
    
}