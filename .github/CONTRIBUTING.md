## Scripts

| Operation | Command
| - | -
| Test one | `npm t <PACKAGE_NAME>`
| Test all | `npm t`
| Lint code | `npm run lint`
| Create the docs | `npm run doc`

## Working on a package

There are a lot of packages in here. When working in a package it is highly recommended to run its test only, for example: `npm t packages/wait` will run `wait` package tests and `npm t wait` will run both `wait` and `await-reduce`, because they both match.

Each package directory should to run its tests only, so from package directory you can run `npm t` only.
```
/workspace/mono/packages/jsnpm $ npm t

> jsnpm@0.3.2 test /workspace/mono/packages/jsnpm
> cd ../../; npm t jsnpm; cd -


> @omrilotan/mono@0.0.0 test /workspace/mono
> ./scripts/test.sh "jsnpm"

Warning: Could not find any test files matching pattern: jsnpm


  jsnpm/npm
    ✓ Should expose a reusable promise (52ms)
...
```

Run code linting from root directory only.
