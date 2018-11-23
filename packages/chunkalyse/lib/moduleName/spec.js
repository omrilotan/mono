const moduleName = require('.');

describe('moduleName', () => {
	it('Should extract module name from file path', () => {
		expect(
			moduleName('./node_modules/react-store')
		).to.equal('react-store');

		expect(
			moduleName('/Volumes/dev/statistician/node_modules/dateformat/lib')
		).to.equal('dateformat');

		expect(
			moduleName('./node_modules/@fiverr-private/futile/lib/__alias')
		).to.equal('@fiverr-private/futile');

		expect(
			moduleName('node_modules/@fiverr-private/futile/lib/url/queryStringToObject/index.mjs')
		).to.equal('@fiverr-private/futile');
	});

	it('Should resolve local modules to "self"', () => {
		expect(
			moduleName('./src/shared/seller_level/index.js')
		).to.equal('self');
		expect(
			moduleName('./lib/utils/isTouchDevice/index.js')
		).to.equal('self');
		expect(
			moduleName('./index.js')
		).to.equal('self');
	});

	it('Should recognise external packages', () => {
		expect(
			moduleName('external {"commonjs":"classnames","commonjs2":"classnames","amd":"classnames","root":"classNames","var":"classNames"}')
		).to.equal('external');
	});

	it('Should include only js css files', () => {
		expect(
			moduleName('./src/shared/delivery_time/style.scss')
		).to.equal(null);
		expect(
			moduleName('./node_modules/@fiverr-private/futile/lib/__alias/index.mjs')
		).to.equal('@fiverr-private/futile');
	});
});
