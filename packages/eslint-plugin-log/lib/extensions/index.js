const common = require('common-js-file-extensions');

module.exports = [].concat(...Object.values(common)).map(ext => `.${ext}`);
