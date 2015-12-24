module.exports = {
    entry: "./src/js/ElectronServerApplication.js",
    output: {
        path: "./build",
        filename: "server-bundle.js"
    },
    target: "atom",
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
