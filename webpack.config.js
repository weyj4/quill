const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require("@babel/register");

const config = {
  entry: ['@babel/polyfill','./src/index.js'],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules : [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        hash: true,
        template: 'src/index.html'
    })
  ],
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  devServer: {
    contentBase: __dirname + '/dist',
    compress: true,
    port: 9000,
    open: true,
    stats: {
        assets: false,
        children: false,
        chunks: false,
        chunkModules: false,
        colors: true,
        entrypoints: false,
        hash: false,
        modules: false,
        timings: false,
        version: false,
    },
    setup(app) {
      const bodyParser = require('body-parser');
      const fs = require('fs');

      app.use(bodyParser.json());

      app.post('/saveAs', bodyParser.json(), (req, res) => {
        console.log(req.body.content);
        fs.writeFile('output.txt', req.body.content, (err) => {
          if (err) {
            res.send('Error writing to file');
          }
          res.send('POST request sent from webpack dev server');
        });
      });
    }
  },
  watch: false,
  devtool: 'source-map',
};

module.exports = config;