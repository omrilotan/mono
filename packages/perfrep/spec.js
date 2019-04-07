const perfrep = require('.');

describe('notate', async() => {
	it('Should return numeric results in percent (between 0 and 100)', async() => {
		const {cpu, memory, heap} = await perfrep();

		expect(cpu).to.be.at.least(0);
		expect(cpu).to.be.at.most(100);
		expect(memory).to.be.at.least(0);
		expect(memory).to.be.at.most(100);
		expect(heap).to.be.at.least(0);
		expect(heap).to.be.at.most(100);
	});
	it('Should take about a second', async() => {
		let cpu, memory, heap;
		async function results() {
			const results = await perfrep();
			cpu = results.cpu;
			memory = results.memory;
			heap = results.heap;
		}

		expect(cpu).to.not.be.a('number');
		expect(memory).to.not.be.a('number');
		expect(heap).to.not.be.a('number');

		results();

		expect(cpu).to.not.be.a('number');
		expect(memory).to.not.be.a('number');
		expect(heap).to.not.be.a('number');

		await wait(100);

		expect(cpu).to.not.be.a('number');
		expect(memory).to.not.be.a('number');
		expect(heap).to.not.be.a('number');

		await wait(1000);

		expect(cpu).to.be.a('number');
		expect(memory).to.be.a('number');
		expect(heap).to.be.a('number');
	});
});
