const validKeyName = /^[A-G][#b]?\s(\bminor\b)?(\bmajor\b)?$/;
const invalidKeys = [
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

module.exports = { validKeyName, invalidKeys };