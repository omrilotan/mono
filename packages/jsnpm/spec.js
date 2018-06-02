const jsnpm = require('./');

describe('jsnpm', async() => {
    it('wip', async() => {
        const exists = await jsnpm.exists('jsnpm');

        assert(exists, 'jsnpm package does not exist');
    });
    it('wip', async() => {
        const exists = await jsnpm.exists('ljaslkjasdnkldjas-09u2398u23uhe');

        assert(!exists, 'ljaslkjasdnkldjas-09u2398u23uhe package exists');
    });
});

