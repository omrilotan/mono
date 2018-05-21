require('colors');

/**
 * The zero-width joiner (ZWJ) is a non-printing character used in the computerized typesetting of some complex scripts, such as the Arabic script or any of the Indic scripts. When placed between two characters that would otherwise not be connected, a ZWJ causes them to be printed in their connected forms. In some cases, such as the second Devanagari example below, the ZWJ follows the second character, rather than the first.
 * @type {String}
 */
const ZERO_WIDTH_JOINER = '\u{200D}';

/**
 * Ranges of characters that should be removed from the string for length measurement
 * @type {Array}
 */
const ranges = Object.values({
    'Variation Selectors': ['\ufe00', '\ufe0f'],
    'Hebrew punctuation': ['\u0591', '\u05C7'],
});

const pattern = new RegExp(
    ranges.map(range => `[${range.join('-')}]`).join('|'),
      'g'
);

/**
 * Count the length of strings without character range "variation selectors"
 * @param  {string} string
 * @return {number}
 */
const len = (string) => Array.from(string.replace(pattern, '')).length;

/**
 * Length of string disregarding control characters, variations and punctuations
 * @param  {string} string
 * @return {number}
 */
module.exports = function length(string){
    const split = string.strip.split(ZERO_WIDTH_JOINER)
    return split.reduce(
        (sum, part) => sum + len(part),
        0
    ) / split.length;
};
