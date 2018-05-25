const fs = require('fs').promises;
const phrase = require('../packages/paraphrase/double');

const title = 'mono';

(async () => {
    const list = (await fs.readdir('packages'))
        .reduce(
            (content, item) => {
                if (!item.startsWith('.')) {
                    content.push(`<li><a href="${item}">${item}</a></li>`)
                }

                return content;
            },
            []
        ).join('')

    const template = (await fs.readFile('src/homepage.html')).toString();

    const output = phrase(template, {
        title,
        list,
    });

    await fs.writeFile('docs/index.html', output)
})();
