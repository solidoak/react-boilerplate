const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
}

const commonConfig = merge([
  {
    entry: {
      app: PATHS.app
    },

    output: {
      path: PATHS.build,
      filename: '[name].js'
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack demo'
      })
    ]
  },

  parts.lintJavascript({ include: PATHS.app })
])
