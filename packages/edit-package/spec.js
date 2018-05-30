const editor = require('./');
const {
    readJsonSync,
    readFileSync,
} = require('fs-extra');

const packageJson = require('../../package.json')

describe('package-editor', () => {
    afterEach(async () => {
        await editor.reset();
    });

    it('reads the package data', async () => {
        expect(await editor.read()).to.deep.equal(packageJson);
    });

    it('should edit package.json file', async () => {
        await editor.write({name: 'NOT_THE_PACKAGE_NAME'});
        expect(readJsonSync('package.json').name).to.equal('NOT_THE_PACKAGE_NAME');
    });

    it('should merge with existing package.json info', async () => {
        await editor.write({name: 'NOT_THE_PACKAGE_NAME'});
        expect(readJsonSync('package.json').version).to.equal(packageJson.version);
    });

    it('reset restores original package.json', async () => {
        await editor.write({name: 'NOT_THE_PACKAGE_NAME'});
        await editor.reset();
        expect(readJsonSync('package.json').name).not.to.equal('NOT_THE_PACKAGE_NAME');
        expect(readJsonSync('package.json').name).to.equal(packageJson.name);
    });

    it('continues from saved package file', async () => {
        await editor.write({name: 'HAIM MISPARAIM'});
        await editor.write({version: '0.0.0-test'});
        expect(readJsonSync('package.json').name).to.equal('HAIM MISPARAIM');
    });

    it('edits nested attributes', async () => {
        await editor.write({
            publishConfig: {
                tag: 'next',
                'tag-version-prefix': 'next-tag',
            }
        });
        await editor.write({
            publishConfig: {
                tag: 'after-next',
            }
        });
        expect(readJsonSync('package.json').publishConfig['tag-version-prefix']).to.equal('next-tag');
    });

    it('creates a beautified result', async () => {
        const contents = readFileSync('package.json').toString();
        expect(contents).to.include('\n');

        // new line after the opening {
        expect(contents[1]).to.equal('\n');

        // 2 spaces indentation
        expect(contents.split('\n')[1].substr(0, 3)).to.equal('  "');

        // space after colon
        expect(contents.split('":')[1][0]).to.equal(' ');
    })
});
