rm -rf fixtures/dist
webpack --config fixtures/webpack/single.js --profile --json > fixtures/stats.json
webpack --config fixtures/webpack/multi.js --profile --json > fixtures/stats.multi.json
