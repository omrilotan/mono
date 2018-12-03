# Prepare own fixtures

```sh
./fixtures/scripts/prepare.sh

./bin/chunkalyse.js fixtures/stats.json
./bin/chunkalyse.js fixtures/stats.multi.json
```

# View imported fixtures fixtures
```
./bin/chunkalyse.js ./fixtures/mono.json
./bin/chunkalyse.js ./fixtures/butter-toast.json
./bin/chunkalyse.js ./fixtures/emoji-picker-react.json
./bin/chunkalyse.js ./fixtures/react-dates.json
```

# Create chunks for testing
```
cat ./fixtures/butter-toast.json > ./fixtures/butter-toast.chunkalised.json
```
