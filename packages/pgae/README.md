# pgae <a href="https://www.npmjs.com/package/pgae"><img src="https://img.shields.io/npm/v/pgae.svg"></a> [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/mono/tree/master/packages/pgae)

## compose html pages

### Example

Template file (`./src/template.html`)
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
		<title>{{ title }}</title>
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
		<style>{{ styles }}</style>
		{{ meta-tags }}
	</head>
	<body>
		<script>{{ head-scripts }}</script>
		<header>{{ header }}</header>
		<article>{{ articles/article-1 }}</article>
		<article>{{ articles/article-2 }}</article>
		<article>{{ forms/contact-form }}</article>
		<article>{{ articles/article-3 }}</article>
		<script>{{ enhancements }}</script>
	</body>
</html>
```

File tree
```
└── src
    ├── articles
    │   ├── article-1.md
    │   ├── article-2.md
    │   └── article-3.md
    ├── enhancements.js
    ├── forms
    │   └── contact-form.html
    │   └── contact-form-handler.js
    ├── head-scripts.js
    ├── header.html
    ├── meta-tags.html
    ├── title.txt
    ├── styles.scss
    └── template.html
```

Recursive file inclusion `./src/forms/contact-form.html`
```html
<form id="contact-form">
	<label for="name">Name</label>
	<input type="text" name="name" value="" required>
	<label for="contact">contact information</label>
	<input type="text" name="contact" value="" required>
	<label for="message">Message</label>
	<textarea name="message" pattern="[\w\s]{7,}"></textarea>
	<button>Send</button>
</form>
<script>{{ forms/contact-form-handler }}</script>
```

Trigger
```js
require('pgae')({
	template: `./src/template.html`,
	sources: `./src`,
	destination: `./docs/index.html`,
});
```
