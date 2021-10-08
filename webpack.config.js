const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.ts'],
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      querystring: require.resolve('querystring-es3'),
    },
    alias: {
      '@app': path.resolve(__dirname, '/app/'),
      '@assets': path.resolve(__dirname, '/assets/'),
      '@components': path.resolve(__dirname, '/app/components/'),
      '@config': path.resolve(__dirname, '/app/config/'),
      '@models': path.resolve(__dirname, '/app/models/'),
      '@services': path.resolve(__dirname, '/app/services/'),
      '@static': path.resolve(__dirname, '/app/static/'),
      '@utils': path.resolve(__dirname, '/app/utils/'),
    },
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: 'index.html',
      favicon: 'assets/images/favicon.ico',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/images/',
        },
      },
    ],
  },
}
