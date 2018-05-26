const fs = require('fs').promises;
const phrase = require('../packages/paraphrase/double');

const title = 'mono';

(async () => {
    const promises = [];
    (await fs.readdir('packages'))
        .forEach(
            (item) => {
                if (item.startsWith('.')) { return }

                const {
                    name,
                    description,
                    version,
                } = require(`../packages/${item}/package.json`);

                promises.push(`
<tr>
    <td><a href="${item}">${name}</a></td>
    <td>${description}</td>
    <td><a href="https://www.npmjs.com/package/${name}"><small>${version}</small></a></td>
</tr>
`)
            }
        )

    const content = (await Promise.all(promises)).join('')

    const template = (await fs.readFile('src/homepage.html')).toString()

    const output = phrase(template, {
        title,
        content,
    });

    await fs.writeFile('docs/index.html', output)
})();
