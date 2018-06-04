const reduce = require('.');
const result = () => new Promise((resolve) => setTimeout(() => resolve('A'), 40))

describe('gitaliases/reduce', async() => {
    let array;
    beforeEach(() => {
        array = [
            result(),
            result(),
            result(),
        ];
    });

    function verifyArray(arr = array) {
        expect(arr).to.have.lengthOf(3);
        assert(
            arr.every(i => (i instanceof Promise)),
            'Should be an array of promises'
        );
    }

    it('Should reduce array to promises', verifyArray);

    it('Should reduce array to promises results', async() =>
        assert(
            (await reduce(
                array,
                async (results, result) => [...results, result],
                []
            )).every(item => (item === 'A')),
            'Should be an array of results'
        )
    );

    it('Should use first items value as default initial value', async() =>
        expect(
            await reduce(
                array,
                (collector, item) => [collector, item].join('')
            ),
            'Should be an array of results'
        ).to.equal('AAA')
    );

    it('Should use passed initial value', async() =>
        expect(
            await reduce(
                array,
                (collector, item) => [collector, item].join(''),
                'B'
            ),
            'Should be an array of results'
        ).to.equal('BAAA')
    );

    it('Should wait for async reducer functions as well', async() =>
        expect(
            await reduce(
                array,
                (collector, item) => new Promise(
                    (resolve) => setTimeout(
                        () => resolve([collector, item].join('')),
                        40
                    )
                ),
                'B'
            ),
            'Should be an array of results'
        ).to.equal('BAAA')
    );

    it('Should pass the index as third argument to reducer', async() => {
            const results = [];

            await reduce(
                array,
                (collector, item, index) => results.push(index),
                {}
            );

            expect(results).to.include(0);
            expect(results).to.include(1);
            expect(results).to.include(2);
            expect(results).to.not.include(3);
    });

    it('Should skip first iteration when initial value is passed', async() => {
            const results = [];

            await reduce(
                array,
                (collector, item, index) => results.push(index)
            );

            expect(results).to.not.include(0);
            expect(results).to.include(1);
            expect(results).to.include(2);
            expect(results).to.not.include(3);
    });

    it('Should pass the array of results as fourth argument to reducer', async() =>
            await reduce(
                array,
                (collector, item, index, arr) => (arr === 'AAA')
            )
    );


    it('Works on a normal array as well', async() =>
            expect(await reduce(
                ['B', 'B', 'B'],
                (collector, item) => [...collector, item],
                []
            )).to.deep.equal(['B', 'B', 'B'])
    );

    it('Should not mutate original array', async() => {
        await reduce(array, () => null);

        verifyArray();
    });
});
