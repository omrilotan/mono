const formatter = require('.');

describe('57475/format', () => {
	let format;
	before(() => {
		format = formatter();
	});
	it(
		'Should throw error when metric name is not a string',
		() => [
			1,
			null,
			{},
			[],
			/\w/,
			undefined,
		].forEach(
			metric => expect(() => format(undefined, metric)).to.throw()
		)
	);
	it(
		'Should throw error when metric value is not a number',
		() => [
			'1',
			null,
			{},
			[],
			/\w/,
		].forEach(
			value => expect(() => format(undefined, 'Hello', value)).to.throw()
		)
	);
	it(
		'Should throw error when type is not one of pre defined types',
		() => [
			'counter',
			'Count',
			'timing',
			'Set',
			null,
			{},
			[],
			/\w/,
		].forEach(
			type => expect(() => format(type, 'Hello', undefined)).to.throw()
		)
	);
	it('Should return a formatted output', () => {
		const result = format(undefined, 'hello');
		expect(result).to.contain('hello');
		expect(result).to.contain('|');
		expect(result).to.contain(':');
	});
	it(
		'Should default type to counter',
		() => expect(format(undefined, 'hello')).to.match(/|c$/)
	);
	it(
		'Should default value to one',
		() => expect(format(undefined, 'hello')).to.contain(':1|')
	);
	[
		['count', 'c'],
		['time', 'ms'],
		['gauge', 'g'],
		['set', 's'],
		['histogram', 'h'],
	].forEach(
		([type, symbol]) => it(
			`Should map type ${type} to symbol ${symbol}`,
			() => expect(format(type, 'hello', undefined)).to.match(new RegExp(`|${symbol}$`))
		)
	);
	it('Should pass in different values', () => {
		[
			2,
			10,
			9.4566,
			.1,
		].forEach(
			number => expect(
				format(undefined, 'metric', number)
			).to.match(
				new RegExp(`:${number}\\|c`)
			)
		);
	});
	it('Should add sample rate', () => {
		const result = format('count', 'metric', 10, {rate: .1});
		expect(result).to.match(/\|c@0.1$/);
	});
	it('Should add tags', () => {
		const result = format('count', 'metric', 10, {tags: {name: 'shlomo'}});
		expect(result).to.match(/\|c#name:shlomo/);
	});
	it('Should map tags object to string in DataDog style (default)', () => {
		const result = format('count', 'metric', 10, {tags: {name: 'shlomo', age: 4, another: 'detail'}});
		expect(result).to.include('name:shlomo,age:4,another:detail');
	});
	it('Should map tags object to string in DataDog Style', () => {
		format = formatter({tagsStyle: 'DD'});
		const result = format('count', 'metric', 10, {tags: {name: 'shlomo', age: 4, another: 'detail'}});
		expect(result).to.include('name:shlomo,age:4,another:detail');
	});
	it('Should map tags object to string in Carbon Style', () => {
		format = formatter({tagsStyle: 'CC'});
		const result = format('count', 'metric', 10, {tags: {name: 'shlomo', age: 4, another: 'detail'}});
		expect(result).to.include('name=shlomo;age=4;another=detail');
	});
	it('Should use a date in order to get time diff', async() => {
		const date = new Date();
		await wait(10);
		const result = format('time', 'metric', date);
		console.log(result);
		expect(result).to.match(/metric:\d*\|ms/);
	});
	it('Should append rate before tags', () => {
		const result = format('count', 'metric', 10, {tags: {name: 'shlomo'}, rate: .1});
		expect(result).to.match(/\|c@[\d.]*#\w/);
	});
	it('Should add a prefix', () => {
		format = formatter({prefix: 'some_prefix'});
		expect(
			format('count', 'metric')
		).to.startWith(
			'some_prefix.metric'
		);
		expect(
			format('time', 'something.else')
		).to.startWith(
			'some_prefix.something.else'
		);
	});
	it('Should sanitise tags', () => {
		const result = format('count', 'metric', 10, {tags: {'name ': 'SHlomo', age: 4, 'ano@@er': 'det4$il'}});
		expect(result).to.include('name_:shlomo,age:4,ano__er:det4_il');
	});
	it('Should sanitise the prefix as well', () => {
		format = formatter({prefix: 'some-prefix$'});
		const result = format('count', 'metric');
		expect(result).to.startWith('some_prefix_.metric');
	});
});
