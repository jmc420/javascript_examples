module.exports = {
    entry: "./src/js/ElectronServerApplication.js",
    output: {
        path: "./build",
        filename: "main.js"
    },
    target: "atom",
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
