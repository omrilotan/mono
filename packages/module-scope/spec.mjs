import scope from './index.mjs';

const {__dirname, __filename, dirname, filename} = scope(import.meta.url);
const here = [process.cwd(), 'packages', 'module-scope'].join('/');

describe('module-scope', () => {
	it('finds __dirname', () => {
		expect(__dirname).to.equal(here);
	});
	it('finds __filename', () => {
		expect(__filename).to.equal([here, 'spec.mjs'].join('/'));
	});
	it('Exposes no underscore names as well', () => {
		expect(__dirname).to.equal(dirname);
		expect(__filename).to.equal(filename);
	});
});
