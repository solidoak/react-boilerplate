const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')

const parts = require('./webpack.parts')

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  style: path.join(__dirname, 'app', 'app.scss')
}

const commonConfig = merge([
  {
    entry: {
      vendor: ['react'],
      app: PATHS.app,
      style: PATHS.style
    },

    output: {
      path: PATHS.build,
      filename: '[name].js'
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack demo'
      })
    ],
  },

  parts.lintJavascript({ include: PATHS.app }),

  parts.loadFonts({
    options: {
      name: '[name].[ext]'
    }
  }),

  parts.loadJavascript({
    include: PATHS.app
  }),

  parts.extractBundles([
    {
      name: 'vendor'
    }
  ])
])

const productionConfig = merge([
  parts.clean(PATHS.build),

  {
    performance: {
      hints: 'warning',
      maxEntrypointSize: 100000,
      maxAssetSize: 450000
    }
  },

  parts.generateSourceMaps({type: 'source-map'}),

  parts.extractCSS({ use: ['css-loader', parts.autoprefix(), 'sass-loader'] }),

  parts.loadImages({
    options: {
      limit: 15000,
      name: '[name].[ext]'
    }
  })
])

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT
  }),

  parts.loadCSS(),

  parts.loadImages()
])

module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig)
  }

  return merge(commonConfig, developmentConfig)
}
