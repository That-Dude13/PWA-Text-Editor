const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new WorkboxPlugin({
      clientsClaim: true,
      
      skipWaiting: true,
      }),
      ],
      plugins: [
        new HtmlWebpackPlugin({
          template: './public/index.html',
          filename: './index.html'
        }),
      ],
        plugins: [
        new InjectManifest({
          swSrc: './src-sw.js',
          swDest:'src-sw.js',
          globDirectory: 'dist/',
          globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,gif,svg,woff,woff2,ttf,eot}'],
          maximumFileSizeToCacheInBytes: 50000000,
          maximumFileSizeToCacheOnDiskInBytes: 50000000,
        }),
      ],
      WebpackPwaManifest
      ({ name, short_name, description, background_color, theme_color, start_url, publicPath, icons }) {
        return [
          new WebpackPwaManifest({
            name: name,
            short_name: short_name,
            description: description,
            background_color: background_color,
            theme_color: theme_color,
            start_url: start_url,
            publicPath: publicPath,
            icons: icons,
          }),
        ]
      },
  
    module: {
      rules: [
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }]
        
              ]
            }
          }
        }
      ]
    }
  }
};