const { merge } = require("webpack-merge");
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",

  output: {
    filename: "[name].js",
    chunkFilename: "[id].css",
    publicPath: ''
  },

  devServer: {
    host: '0.0.0.0',
    port: process.env.PORT || 8080,
    static: {
      directory: path.join(process.cwd(), "./dist"),//path.join(__dirname, 'public'),
    },
    //contentBase: path.join(process.cwd(), "./dist"),
    //watchContentBase: true,
    //quiet: false,
    open: true,
    compress: true,
    historyApiFallback: {
      rewrites: [{from: /./, to: "404.html"}]
    }
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "dist/**/*.js",
        "dist/**/*.css",
        "site/content/webpack.json"
      ]}),

    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
});
