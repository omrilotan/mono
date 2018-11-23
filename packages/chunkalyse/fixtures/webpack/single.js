const {resolve} = require('path');
const config = require('.');

module.exports = config({
	entry: resolve(__dirname, '../src/index.js'),
});
