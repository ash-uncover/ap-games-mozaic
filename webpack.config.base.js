/* eslint-disable */

const path = require('path')

const DIR_SRC = path.resolve(__dirname, 'src')
const DIR_NODE_MODULES = path.resolve(__dirname, 'node_modules')

const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: path.resolve(DIR_SRC, 'index.tsx'),

  resolve: {
    modules: ['node_modules', './src'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  plugins: [
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, '_redirects'),
        to: '.',
      }]
    }),
  ],

  module: {
    rules: [
      {
        test: /.(jsx|js)$/,
        include: DIR_SRC,
        exclude: DIR_NODE_MODULES,
        use: [
          { loader: 'babel-loader' },
        ],
      },
      {
        test: /\.tsx?$/,
        include: DIR_SRC,
        exclude: DIR_NODE_MODULES,
        use: [
          { loader: 'ts-loader' },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: {
            url: {
              filter: (url, resourcePath) => {
                // Don't handle `images` urls
                if (url.includes('images/')) {
                  return false;
                }
                return true;
              },
            },
          } },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext][query]',
        },
      },
      {
        test: /\.(mp3|flac)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'sound/[name][ext][query]'
        }
      },
      {
        test: /\.(_redirects)$/i,
        type: 'asset/resource',
      },
    ],
  },
}
