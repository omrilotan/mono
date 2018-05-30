const { packageData } = require('./');

describe('edit-package/utils/packageData', async() => {
    it('Retrieves data object', async() => {
        const data = await packageData();

        expect(data.name).to.equal('@omrilotan/mono');
        expect(data.private).to.be.true;
        expect(data.repository.type).to.equal('git');
    });
});
