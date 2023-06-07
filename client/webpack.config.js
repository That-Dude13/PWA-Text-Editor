const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'production',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new GenerateSW({
      clientsClaim: true,
      skipWaiting: true
      }),
      ],
      plugins: [
        new HtmlWebpackPlugin({
          template: './public/index.html',
          filename: './index.html'
        }),
      
        
        new InjectManifest({
          swSrc: './src-sw.js',
          swDest:'src-sw.js',
          globDirectory: 'dist/',
          globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,gif,svg,woff,woff2,ttf,eot}'],
          maximumFileSizeToCacheInBytes: 50000000,
          maximumFileSizeToCacheOnDiskInBytes: 50000000,
        }),
      
      // const generateManifest = ({ name, short_name, description, background_color, theme_color, start_url, publicPath, icons }) => {
        
          new WebpackPwaManifest({
        
            name: 'PwaTexEditor',
            short_name: 'Edit',
            description: 'Automatically edit your text',
            background_color: '#225ca3',
            theme_color: '#225ca3',
            start_url: './',
            publicPath: './',
            icons: [
              {
                src: path.resolve('src/images/logo.png'),
                sizes: [96, 128, 192, 256, 384, 512],
                destination: path.join('assets', 'icons'),
              },
            ],
          }),
      ],
      
      
  
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