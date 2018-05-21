Object.assign(
    global,
    require('chai'),
    {
        sleep: (ttl = 80) => new Promise((resolve) => setTimeout(resolve, ttl)),
    }
);

require('dont-look-up')('./packages');

process.on('unhandledRejection', (error) => { throw error; });
