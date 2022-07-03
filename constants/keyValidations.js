const VALID_KEY_NAME = /^[A-G][#b]?\s(\bminor\b)?(\bmajor\b)?$/;
const INVALID_KEYS = [
    'Cb minor',
    'Db minor',
    'D# major',
    'E# major',
    'E# minor',
    'Fb major',
    'Fb minor',
    'Gb minor',
    'G# major',
    'A# major',
    'B# major',
    'B# minor'
];

module.exports = { VALID_KEY_NAME, INVALID_KEYS };