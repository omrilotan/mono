# 🌕 the-moon [![](https://img.shields.io/npm/v/the-moon.svg)](https://www.npmjs.com/package/the-moon) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/the-moon)

## Show me the moon 🌑🌒🌓🌔🌕🌖🌗🌘🌑

```js
const moon = require('the-moon');
```

Get today's moon
```js
moon(); // 🌗 (today's moon)
```

Choose a different date
```js
moon(2017); // 🌑 (today in 2017)
moon(2017, 3, 14); // 🌕 (a specific date)
```

Choose from available formats (`moon.FORMATS`) default is icon
```js
moon(2017, 3, 14, {format: 'code'}); // 'full-moon'
moon({format: 'name'}); // 'Last Quarter Moon'
```

| format | example
| - | -
| icon | 🌕
| code | `full`
| name | `Full Moon`

## Moon Glossary

| Icon | Name | Code
| - | - | -
| 🌑 | New Moon | `new`
| 🌒 | Waxing Crescent Moon | `waxing-crescent`
| 🌓 | Quarter Moon | `quarter`
| 🌔 | Waxing Gibbous Moon | `waxing-gibbous`
| 🌕 | Full Moon | `full`
| 🌖 | Waning Gibbous Moon | `waning-gibbous`
| 🌗 | Last Quarter Moon | `last-quarter`
| 🌘 | Waning Crescent Moon | `waning-crescent`
