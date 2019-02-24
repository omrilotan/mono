const errobj = require('.');

describe('error-notation', () => {
	it('Should convert an error to an object', () => {
		const error = new Error('Everything is okay');

		const obj = errobj(error);
		expect(obj.toString()).to.equal('[object Object]');
	});
	it('Should include all error fields', () => {
		const error = new TypeError('Nothing');
		error.details = {answer: 42};
		error.code = 'UNKNERR';
		const obj = errobj(error);
		expect(obj.message).to.equal('Nothing');
		expect(obj.name).to.equal('TypeError');
		expect(obj.code).to.equal('UNKNERR');
		expect(obj.details).have.any.keys('answer');
		expect(obj.stack).to.be.a('string');
	});

	it('Should include any custom property attached to the error', () => {
		const error = new RangeError('Nothing');
		error.extra = 'information';
		const {extra} = errobj(error);
		expect(extra).to.equal('information');
	});
	it('Should include enrichment fields', () => {
		const error = new RangeError('Nothing');
		const {extra} = errobj(error, {extra: 'information'});
		expect(extra).to.equal('information');
	});
	it('Should give precedence to enrichment fields over the native ones', () => {
		const error = new RangeError('Nothing');
		const {message} = errobj(error, {message: 'Something'});
		expect(message).to.equal('Something');
	});

	it('Should find line and column from browser error stack', () => {
		const error = new RangeError('Nothing');
		error.stack = `ReferenceError: something is not defined
at change (index.html:46)
at index.html:53
at index.html:56`;
		const {fileName, lineNumber, columnNumber} = errobj(error);
		expect(fileName).to.equal('index.html');
		expect(lineNumber).to.equal(46);
		expect(columnNumber).to.be.undefined;
	});

	it('Should not attach parsedStack by default', () => {
		const error = new RangeError('Nothing');
		error.stack = `ReferenceError: something is not defined
at change (index.html:46)
at index.html:53
at index.html:56`;
		const {parsedStack} = errobj(error);
		expect(parsedStack).to.be.undefined;
	});

	it('Should attach parsedStack to the details', () => {
		const error = new RangeError('Nothing');
		error.stack = `ReferenceError: something is not defined
at change (index.html:46)
at index.html:53
at index.html:56`;
		const {parsedStack} = errobj(error, null, {parsedStack: true});
		expect(parsedStack).to.be.an('array');
	});

	it('Should find line and column from nodejs error stack', () => {
		const error = new RangeError('Nothing');
		error.stack = `at /app/dist/apps/listings/server.js:1329:40
at Array.filter (<anonymous>)
at Object.category (/app/dist/apps/listings/server.js:1327:37)
at buildSubCategoryFilter (/app/dist/apps/listings/server.js:40171:31)
at buildAppFilters (/app/dist/apps/listings/server.js:40145:18)
at Object.listingsResult (/app/dist/apps/listings/server.js:29813:22)
at /app/dist/apps/listings/server.js:27177:21
at process._tickCallback (internal/process/next_tick.js:68:7)`;
		const {fileName, lineNumber, columnNumber} = errobj(error);
		expect(fileName).to.equal('/app/dist/apps/listings/server.js');
		expect(lineNumber).to.equal(1329);
		expect(columnNumber).to.equal(40);
	});

	it('Should find line and column from browser error stack', () => {
		const error = new RangeError('Nothing');
		error.stack = `TypeError: Cannot read property 'gf' of undefined
at t.r.getPageLoadTime (https://cdn.website.com/assets/application.js:1:284663)
at d (https://cdn.website.com/assets/business-logic.js:1:286145)
at https://connect.facebook.net/en_US/fbevents.js:25:21849
at HTMLIFrameElement.b (https://connect.facebook.net/en_US/fbevents.js:24:3061)`;
		const {fileName, lineNumber, columnNumber} = errobj(error);
		expect(fileName).to.equal('https://cdn.website.com/assets/application.js');
		expect(lineNumber).to.equal(1);
		expect(columnNumber).to.equal(284663);
	});

	it('Should prefer existing lineNumber and columnNumber', () => {
		const error = new RangeError('Nothing');
		error.lineNumber = 2;
		error.columnNumber = 4;
		error.stack = `TypeError: Cannot read property 'gf' of undefined
at t.r.getPageLoadTime (https://cdn.website.com/assets/application.js:1:284663)
at d (https://cdn.website.com/assets/business-logic.js:1:286145)
at https://connect.facebook.net/en_US/fbevents.js:25:21849
at HTMLIFrameElement.b (https://connect.facebook.net/en_US/fbevents.js:24:3061)`;
		const {lineNumber, columnNumber} = errobj(error);
		expect(lineNumber).to.equal(2);
		expect(columnNumber).to.equal(4);
	});

	it('Should offset the parsed stack trace', () => {
		const error = new RangeError('Nothing');
		error.stack = `TypeError: Cannot read property 'gf' of undefined
at t.r.getPageLoadTime (https://cdn.website.com/assets/application.js:1:284663)
at d (https://cdn.website.com/assets/business-logic.js:4:286145)
at https://connect.facebook.net/en_US/fbevents.js:25:21849
at HTMLIFrameElement.b (https://connect.facebook.net/en_US/fbevents.js:24:3061)`;
		let lineNumber, columnNumber;
		({lineNumber, columnNumber} = errobj(error, null, {offset: 1}));
		expect(lineNumber).to.equal(4);
		expect(columnNumber).to.equal(286145);

		({lineNumber, columnNumber} = errobj(error, null, {offset: 2}));
		expect(lineNumber).to.equal(25);
		expect(columnNumber).to.equal(21849);
	});
});
