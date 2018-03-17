// 'use strict';
var path = require('path');
// var webpack = require('webpack');

module.exports = {
    entry:'./script.js',

    // entry:'./modells_search_engine.js',
    // complied version of yr react code
    output:{
        path: path.resolve(__dirname,' '),
        filename: 'vipes_transpiled.js'
    },
    module :{

        rules: [
          {
             test: /\.(png|jpg)$/,
             use:[
               {
                 loader: 'url-loader',
                 options: {
                    limit:8192,
                    fallback:'file-loader'

                  }
                }
             ],
             exclude:/node_modules/
            }
        ],

        rules:[

                {
                test: /\.js$/,
                loader:'babel-loader',
                exclude:/node_modules/,
                query: {
                    presets:['env','react','flow']
                }

            }

        ]



    }
};
