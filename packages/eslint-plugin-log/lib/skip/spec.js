const skip = require('.');

describe('eslint-plugin-log/skip', () => {
	const {argv} = process;
	afterEach(() => {
		process.argv = argv;
	});
	it('Should not skip by default', () => {
		expect(skip([])).to.be.false;
	});
	[
		'checkstyle',
		'html',
		'jslint-xml',
		'json-with-metadata',
		'json',
		'junit',
		'table',
		'tap',
		'visualstudio',
	].forEach(format => it(
		`Should skip when format is set to ${format}`,
		() => expect(
			skip([
				'-c', '.eslintrc', '*.js', '**/*.js',
				'--quiet',
				'--format',
				format,
				'--plugin',
				'log',
			])
		).to.be.true
	));
	[
		'compact',
		'stylish',
		'unix',
	].forEach(format => it(
		`Should skip when format is set to ${format}`,
		() => expect(
			skip([
				'-c', '.eslintrc', '*.js', '**/*.js',
				'--quiet',
				'--format',
				format,
				'--plugin',
				'log',
			])
		).to.be.false
	));
	it(
		'Should skip when format is set with and without = sign, and for case insensitive value',
		() => [
			['--format=checkstyle'],
			['--format', 'checkstyle'],
			['--format=checkStyle'],
		].forEach(format => expect(
			skip([
				'-c', '.eslintrc', '*.js', '**/*.js',
				'--quiet',
				...format,
				'--plugin',
				'log',
			])
		).to.be.true)
	);
});
