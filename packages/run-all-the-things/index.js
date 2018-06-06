#!/usr/bin/env node

const { exec } = require('child_process');

const args = [...process.argv];

const names = [
    ...Object.keys(require('./package.json').bin),
    __filename.split('/').pop(),
];

while (args[0] && !names.some(string => args[0].endsWith(string))) {
    args.shift();
}

args.shift();

let count = args.length;

Promise.all(args.map(run));

async function run(script) {
    const task = exec(`npm run ${script}`)
    process.on('SIGINT', task.kill);

    task.stdout.pipe(process.stdout);
    task.stderr.pipe(process.stderr);

    task.on('close', code => {
        count--;
        console.log(`process exited with code ${code}`);
        count || process.kill(process.pid);
    });
}
