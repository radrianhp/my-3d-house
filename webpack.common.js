const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src/scripts.js"),
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, "static") }],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/basicScene.html"),
      minify: true,
    }),
    new MiniCSSExtractPlugin(),
  ],
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: ["html-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/images/",
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPathL: "assets/fonts/",
            },
          },
        ],
      },
    ],
  },
};
