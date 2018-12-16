const rmext = require('.');

describe('rmext', () => {
	it('Should remove extname from file path', () => {
		expect(rmext('/workspace/application/file.json')).to.equal('/workspace/application/file');
	});
	it('Should remove extname from file URL', () => {
		expect(rmext('https://www.website.com/directory/page.html')).to.equal('https://www.website.com/directory/page');
	});
	it('Should strip only last charecters from filename', () => {
		expect(rmext('file.name.with.dots.extension')).to.equal('file.name.with.dots');
	});
	it('Should leave files with no extensions', () => {
		expect(rmext('/workspace/application/notes')).to.equal('/workspace/application/notes');
	});
	it('Should leave dotfiles', () => {
		expect(rmext('/workspace/application/.gitignore')).to.equal('/workspace/application/.gitignore');
	});
});
