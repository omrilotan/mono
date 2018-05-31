const Gauge = require('./');

describe('oh-my-gauge/Gauge', () => {
    const gauge = new Gauge(() => {});

    describe('Wrapped function works as expected', () => {
        it('Returns the return value', () => {
            const wrapped = gauge(() => 'one');
            expect(wrapped()).to.equal('one');
        });

        it('Receives the arguments', () => {
            const wrapped = gauge((one, two, three) => [three, two, one].join(', '));
            expect(wrapped('one', 'two', 'three')).to.equal('three, two, one');
        });

        it('Keeps function scope (\'this\' keyword)', () => {
            const collection = {
                name: 'my collection',
                whatsMyName: function() {
                    return this.name;
                }
            };

            collection.wrapped = gauge(collection.whatsMyName);
            expect(collection.wrapped()).to.equal('my collection');
        });
    });

    describe('Gauge function works correctly', () => {
        it('Reports the wrapped name', (done) => {
            const wrapped = (new Gauge((number, name) => {
                expect(name).to.be.a('string');
                done();
            }))(() => {}, 'name');

            wrapped();
        });

        it('Reports a numeral value', (done) => {
            const wrapped = (new Gauge((number) => {
                expect(number).to.be.a('number');
                done();
            }))(() => {});

            wrapped();
        });

        it('Reports process time', (done) => {
            const wrapped = (new Gauge((number) => {
                expect(number).to.be.above(90);
                expect(number).to.be.below(110);
                done();
            }))(() => {
                freeze(100);
            });

            wrapped();
        });
    });
});
