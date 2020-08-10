require('colors');
const boxed = require('./');

const log = (...args) => console.log(boxed(...args)); // eslint-disable-line no-console

log('');

log('Celebrate what you want to see more of');

log('Sometimes too much to drink is barely enough', { theme: 'double', color: 'bgBlue' });

log(`I have a dream
that my four little children
will one day live in a nation
where they will not be judged
by the color of their skin,
but by the content of their character.
I have a dream today!`, { color: 'green', padding: 5, theme: 'round' });

log('I have a title', { title: 'I am the title'.bold });

log(`I am aligned to the left
see?`, { align: 'left' });

log(`I, however,
am aligned to the right.`, { align: 'end' });
log([ 'My white spaces counts!                    ',
     'I can move blocks of text from side to side.', // eslint-disable-line indent
     '                   and I control it manually', // eslint-disable-line indent
     '                                    😀      ', // eslint-disable-line indent
].join('\n'));

const $ = '✓'.green;

log(`Common 😜  emojis ${'and decorated text'.green.bold.underline}
are supported 🍺  ⚽️  and celebrated 🎉
${'We also support'.bold}:
 ${$} left, right, and center alignment
 ${$} custom padding
 ${$} border colors and themes`, { theme: 'round', color: 'cyan', align: 'left' });

log(`some comopund emojis still need work
👨‍👧‍👦
👨‍👨‍👦‍👦
🇧🇷
🙌🏾`);
