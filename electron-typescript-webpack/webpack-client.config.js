module.exports = {
    entry: "./src/js/ElectronBrowserApplication.js",
    output: {
        path: "./build",
        filename: "client-bundle.js"
    },
    externals: {
      "electron": "electron"
    },
    "target": "atom",
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
