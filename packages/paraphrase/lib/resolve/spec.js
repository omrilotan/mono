const resolve = require('./');

describe('paraphrase/resolve', () => {

    const myData = {
        top: {
            middle: {
                low: 'value'
            }
        }
    };

    it(
        'resolve can process string',
        () => expect(resolve.bind(null, '')).to.not.throw(TypeError)
    );

    it(
        'throws error when non string is supposed to be processed',
        () => expect(resolve.bind(null, {})).to.throw(TypeError)
    );

    it(
        'Resolves to nested data structure',
        () => expect(
            resolve('top.middle', myData)
        ).to.deep.equal(
            {low: 'value'}
        )
    );

    it(
        'Resolves to an object',
        () => expect(
            resolve('top.middle.low', myData)
        ).to.equal(
            'value'
        )
    );

    it(
        'Resolves missing data to \'undefined\'',
        () => expect(
            resolve('missing.data', myData)
        ).to.equal(
            undefined
        )
    );
});
