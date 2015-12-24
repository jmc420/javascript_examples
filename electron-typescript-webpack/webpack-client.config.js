module.exports = {
    entry: "./src/js/ElectronBrowserApplication.js",
    output: {
        path: "./build",
        filename: "client-bundle.js"
    },
    target: "atom",
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
