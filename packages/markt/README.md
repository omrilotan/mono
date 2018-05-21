# markt [![](https://nodei.co/npm/markt.png?compact=true)](https://www.npmjs.com/package/markt) [![](https://user-images.githubusercontent.com/516342/38551453-17b7e8ca-3cb1-11e8-9754-b70c6e0f316c.png)](https://github.com/omrilotan/markt)

Generate pages from markdown

## CI-CD use

```sh
npx markt README.md ./docs/index.html ./scripts/docs.template.html
```

#### arguments

| Order | Role | Default
| --- | --- | ---
| 1 | Source | `./README.md`
| 2 | Destination | `./index.html`
| 3 | Template | None

## Template is optional

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
        <title>My document</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
        <link rel="stylesheet" href="https://omrilotan.github.io/markt/styles.css">
    </head>
    <body>
        {{ content }}
    </body>
</html>
```

---

from the desk of [omrilotan <img style="height:32px; vertical-align:middle;" src="https://user-images.githubusercontent.com/516342/37675827-f3016264-2c7e-11e8-9806-46341bec1d6c.png">](https://omrilotan.com)
