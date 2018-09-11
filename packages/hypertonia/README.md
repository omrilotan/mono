# hypertonia [![](https://img.shields.io/npm/v/hypertonia.svg)](https://www.npmjs.com/package/hypertonia) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/hypertonia)

## A theme for [Hyper](https://hyper.is/)

![image](https://user-images.githubusercontent.com/516342/45075333-787e1000-b0ef-11e8-9094-802b4f09ba31.png)

#### Install
Add `hypertonia` to the `plugins` array in `~/.hyper.js`.

```js
...
  plugins: [
    'hypertonia',
  ],
...
```

#### Configure
Your `~/.hyper.js` `config` takes precedence, delete colour and font attributes you want **not** to override.

```js
...
	config: {
		fontFamily: '"consolas"',
		fontSize: 16,
		colors: {
			red: '#C51E14',
		},
	}
...
```
