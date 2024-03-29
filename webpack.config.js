const path = require('path');

const Config = (entry, name, target, path) => {
  return {
    entry,
    target,
    mode: "development",
    module: {
      rules: [
        {
          test: /\.js?/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/react"],
          },
        }],
    },
    output: {
      path,
      filename: `bundled_${name}.js`,
      publicPath: '/'
    }
  }
}

const clientEntry = path.resolve(__dirname, "src", "client", "Client.js");
const clientPath = path.resolve(__dirname, "dist");
const clientConfig = Config(clientEntry, "main", "web", clientPath);

const serverEntry = path.resolve(__dirname, "server.js");
const serverPath = __dirname;
const serverConfig = Config(serverEntry, "server", "node", serverPath);

module.exports = [serverConfig, clientConfig]
