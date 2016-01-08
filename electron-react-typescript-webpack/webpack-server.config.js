module.exports = {
  entry: "./src/js/ElectronServerApplication.js",
  output: {
    path: "./build",
    filename: "main.js"
  },
  target: "atom",
  module: {
    loaders: [{
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.json$/,
      loader: "json"
    }]
  },
  node: {
    console: false,
    process: false,
    global: false,
    buffer: false,
    __filename: false,
    __dirname: false
  }
};
