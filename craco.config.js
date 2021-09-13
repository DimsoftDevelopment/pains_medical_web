// const CracoLessPlugin = require('craco-less');
const path = require('path');

module.exports = {
  webpack: {
    alias: {
      "@assets": path.resolve(__dirname, 'src/assets/'),
      "@components": path.resolve(__dirname, 'src/components/'),
      "@pages": path.resolve(__dirname, 'src/pages/'),
      "@reducers": path.resolve(__dirname, 'src/reducers.js'),
      "@router": path.resolve(__dirname, 'src/router'),
      "@sagas": path.resolve(__dirname, 'src/sagas.js'),
      "@services": path.resolve(__dirname, 'src/services/'),
      "@config": path.resolve(__dirname, 'src/config.js'),
    }
  },
}; 