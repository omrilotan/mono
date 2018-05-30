# bench-press [![](https://img.shields.io/npm/v/bench-press.svg)](https://www.npmjs.com/package/bench-press) [![](https://img.shields.io/badge/mono--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono)


Benchmark operations

## Use

```js
import benchpress from 'bench-press';

console.log(
    benchpress(() => myFunction())
);

// Running 1000 times took 54ms
```
## Options

### Message
```js
console.log(
    benchpress(
        () => myFunction(),
        {
            message: 'myFunction ✖ ${iterations} = ${duration}',
        }
    )
);

// myFunction ✖ 1000 = 54
```

### Iterations
```js
console.log(
    benchpress(
        () => myFunction(),
        {
            iterations: 1e5,
        }
    )
);

// Running 100000 times took 54ms
```

