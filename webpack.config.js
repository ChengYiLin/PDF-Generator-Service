const path = require("path");
const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    name: "handler",
    mode: "development",
    entry: slsw.lib.entries,
    target: "node",
    externals: [nodeExternals()],
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    },
    module: {
        rules: [
            {
                // Include ts, tsx, js, and jsx files.
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
        ],
    },
    output: {
        libraryTarget: "commonjs",
        path: path.resolve(__dirname, ".webpack"),
        filename: "[name].js",
    },
    plugins: [new CleanWebpackPlugin()],
};
