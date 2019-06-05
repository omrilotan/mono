# committee [![](https://img.shields.io/npm/v/committee.svg)](https://www.npmjs.com/package/committee) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/committee)

## 🕶 Commit as someone else

```
npx committee octocat 🐙 just checking this out
              ↑        ↑
              username message
```

## Install globally
```
npm i committee -g
```

### Arguments
First: Author name (optional, default is octocat)
Rest: Commit message (optional, default is a random message from [whatthecommit.com](https://whatthecommit.com/))

### Options
`--help` `-h`: Tell me about committee
`--automate` `-a`: Prevent prompts (use defaults when arguments are missing)

Example
```
committee --automate
```

<img src="https://user-images.githubusercontent.com/516342/50175179-ca485000-0304-11e9-8409-76d3bb0e1cc9.png" width="450px">
