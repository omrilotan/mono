# dirdo [![](https://img.shields.io/npm/v/dirdo.svg)](https://www.npmjs.com/package/dirdo) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/dirdo)

## 🗂 Execute command in all nested directories

Will iterate over all **directories** nested under the target directory and execute given command

![](https://user-images.githubusercontent.com/516342/59059060-b7233f80-88a6-11e9-93ff-9a8039950eca.gif)

Install
```
npm i -g dirdo
```

Example
```bash
dirdo packages 'npm update'
```

Or use straight out of NPM (good for CI tools)
```
npx dirdo packages 'npm i'
```
