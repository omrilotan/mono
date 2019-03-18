import scope from '.';

const {__dirname, __filename} = scope(import.meta.url);
const here = [process.cwd(), 'packages', 'module-scope'].join('/');

export default function() {
	describe('module-scope', () => {
		it('finds __dirname', () => {
			expect(__dirname).to.equal(here);
		});
		it('finds __filename', () => {
			expect(__filename).to.equal([here, 'spec.mjs'].join('/'));
		});
	});
}
