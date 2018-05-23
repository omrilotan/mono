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

    it('pattern can be padded with white space', async () => {
        expect(
            await markt('*Hello*', '{{ content }}')
        ).to.equal(
            '<p><em>Hello</em></p>'
        );
    });

    it('test options object', async () => {
        const res = await markt('*Hello*', {
            template: '{{title}} {{content}}',
            title: 'the title'
        });

        expect(res).to.include('<p><em>Hello</em></p>');
        expect(res).to.include('the title');
        expect(res).to.not.include('{{content}}');
        expect(res).to.not.include('{{title}}');
    });
});
