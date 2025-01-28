const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // ...existing code...
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash].css',
        chunkFilename: 'static/css/[name].[contenthash].css',
      }));
    }
    return config;
  },
};
