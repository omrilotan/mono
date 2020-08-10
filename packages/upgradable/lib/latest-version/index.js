const getLatest = require('../get-latest');

process.on('message', async ({ name }) => process.send(await getLatest(name)));
