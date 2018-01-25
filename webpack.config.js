const webpack = require('webpack')
const path = require('path')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    'index.tsx'
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, "dist")
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000,
    historyApiFallback: true,
    inline: true,
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015', 'stage-0']
        },
        exclude: /node_modules/
      }, {
        test: /\.tsx?$/,
        loaders: ['babel-loader', 'ts-loader'],
      }, {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader', 'postcss-loader']
        })
      }, {
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader",
        query: {
          limit: 8196,
          name: './public/images/[hash].[ext]'
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 4096,
          name: './public/fonts/[hash].[ext]'
        }
      }
    ]
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false, //移除注释
      },
      compress: { //压缩脚本
        warnings: false,
        drop_console: false
      }
    }),
    new ExtractTextPlugin(path.join(__dirname, "dist", "styles.css")), //输出css
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {
        postcss: [autoprefixer]
      }
    })
  ],
  devtool: process.env.NODE_ENV === 'production'
    ? 'eval'
    : 'cheap-module-eval-source-map'
}