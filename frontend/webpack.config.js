const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  target: ["web", 'es5'],
  output: {
    path: path.join(__dirname, "/src"),
    filename: "index.bundle.js",
    publicPath: '/'
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }
      ]
    },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader" ],
      },
      {
        test: /\.less$/,
        
        use: [{
          loader: "style-loader"
      }, {
          loader: "css-loader"
      }, {
          loader: "less-loader",
          options: {
            lessOptions: {
               javascriptEnabled: true
            }
          }
      }]
      }
    ],
  },
  plugins: [new MiniCssExtractPlugin(), new Dotenv() ],
   performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};
