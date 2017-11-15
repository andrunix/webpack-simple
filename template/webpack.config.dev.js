var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [ 'babel-polyfill', './src/main.js'],
  // entry: {
    // 'babel-polyfill': ['babel-polyfill'],
    // main: './src/main.js',
  // },
  output: {
    path: path.resolve(__dirname, './sp/dist'),
    filename: 'build.js',
    publicPath: '/sp/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.template.ejs',
      inject: 'body',
      devOptions: {
        user: 'g100050'
      }
    })
  /*
    new webpack.optimize.CommonsChunkPlugin({
      name: 'babel-polyfill',
      filename: 'vendor.js',
      minChunks: function(module, count) {
        var context = module.context;
        console.log('context: ', context);
        // return context && context.indexOf('babel') >= 0;
        return context && context.indexOf('node_modules') >= 0;
      }
    })
  */
  ], 
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

