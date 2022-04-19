//randomly selects key to be constructed
const randomizer = require('./randomizer');

function selectKey() {
    const pitches = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
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

    //chooses random key
    const rndIndex = randomizer.randomIntFromInterval(0, 7);
    let key = pitches[rndIndex];

    const rndInt = randomizer.randomIntFromInterval(0, 3);
    if (rndInt === 1) {
        key += '#';
    }
    if (rndInt === 2) {
        key += 'b';
    }

    let mode = (Math.round(Math.random()) === 0) ? 'major' : 'minor';

    //checks for invalid key and chooses new one via recursion if necessary 
    if (invalidKeys.includes(`${key} ${mode}`)) {
        [key, mode] = selectKey();
    }
    return [key, mode];
}

module.exports = { selectKey };

