describe('oh-my-gauge', () => {
    beforeEach(() => {
        delete require.cache[require.resolve('.')];
        delete require.cache[require.resolve('./lib/gauge')];
        delete require.cache[require.resolve('./lib/benchmark')];
    });

    it('exposes Benchmark and Gauge', () => {
        const { Gauge, Benchmark } = require('.');
        expect(Gauge).to.equal(require('./lib/gauge'));
        expect(Benchmark).to.equal(require('./lib/benchmark'));
    });

    it('Should require modules only explicitly', () => {
        require('.');

        expect(require.cache[require.resolve('.')]).to.not.be.undefined;
        expect(require.cache[require.resolve('./lib/gauge')]).to.be.undefined;
        expect(require.cache[require.resolve('./lib/benchmark')]).to.be.undefined;

        const { Gauge, Benchmark } = require('.'); // eslint-disable-line no-unused

        expect(require.cache[require.resolve('./lib/gauge')]).to.not.be.undefined;
        expect(require.cache[require.resolve('./lib/benchmark')]).to.not.be.undefined;
    });
});
