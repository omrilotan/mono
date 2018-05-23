# markt

Generate pages from markdown

## CI-CD use

```sh
npx markt --source README.md --destination ./docs/index.html --template ./scripts/docs.template.html
```

#### arguments

| Name | Role | Default
| --- | --- | ---
| source | Markdown to be converted to HTML and replaced by {{ content }} | `./README.md`
| destination | Destination file | `./index.html`
| Template | File | `{{content}}`
| Anything | Any additional options will be a replacement †

† Additional options exaple
For example, `--title My\ awesome\ package` will replace `{{ title }}` from a given template with `My awesome package`

## Example Template (optional)

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
        <title>{{ title }}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
        <link rel="stylesheet" href="https://omrilotan.github.io/markt/styles.css">
    </head>
    <body>
        {{ content }}
    </body>
</html>
```
