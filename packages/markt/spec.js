const markt = require('./');
const assert = require('assert');

describe('markt', async () => {
    it('without a template, converts to markdown', async () => {
        const res = await markt('*Hello*');

        assert.strictEqual(
            res,
            '<p><em>Hello</em></p>'
        );
    });

    it('fills pattern in template', async () => {
        const res = await markt('*Hello*', '{{content}}');

        assert(
            res.includes('<p><em>Hello</em></p>')
        );
    });

    it('pattern is a bit loose', async () => {
        [
            '{{ content }}',
            '{{Content }}',
            '{{    CONTENT    }}',
        ].forEach(async template => {
            const res = await markt('*Hello*', template);

            assert.strictEqual(
                res,
                '<p><em>Hello</em></p>'
            );
        })
    });

    it('fills just first pattern in template', async () => {
        const res = await markt('*Hello*', '{{content}} {{content}}');

        assert(res.includes('{{content}}'));
        assert(res.includes('<p><em>Hello</em></p>'));
    });
});
