find . | grep spec.js | grep "$1" | grep -v node_modules | xargs echo "./spec.js $@" | xargs mocha --timeout 60000
