rm -rf ./dist
mkdir ./dist
webpack --config ./webpack/single.js --profile --json > ./dist/stats.json
webpack --config ./webpack/multi.js --profile --json > ./dist/stats.multi.json
