if [ -z $CI ]; then
	find . | grep spec.js | grep "$1" | grep -v node_modules | xargs echo "./spec.js $@" | xargs mocha --full-trace --timeout 60000
else
	node scripts/test.js
fi
