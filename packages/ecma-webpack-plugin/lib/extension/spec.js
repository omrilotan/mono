const extension = require('.');

describe('ecma-webpack-plugin/lib/extension', () => {
	it('Should extract extension name from file', () => {
		expect(extension('./dir/file.js')).to.equal('js');
		expect(extension('./dir/file.spec.js')).to.equal('js');
		expect(extension('./dir/file.something')).to.equal('something');
		expect(extension('string')).to.equal('');
		expect(extension('.dotfile')).to.equal('');
	});
	it('Should ignore query string parameters', () => {
		expect(extension('./dir/file.js?key=balue')).to.equal('js');
	});
});
