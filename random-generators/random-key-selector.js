//randomly selects key to be constructed
const { accidentals } = require("../constants/chromaticSigns");
const { scalePitches } = require("../constants/pitches");
const { invalidKeys } = require("../constants/keyValidations");
const { randomIntegerFromInterval } = require('./randomizer');

function selectKey() {
    //chooses random key
    const randomIndex = randomIntegerFromInterval(0, 7);
    let key = scalePitches[randomIndex];

    const randomInteger = randomIntegerFromInterval(0, 3);
    if (randomInteger === 1) {
        key += accidentals.SHARP;
    }
    if (randomInteger === 2) {
        key += accidentals.FLAT;
    }

    let mode;
    if (Math.round(Math.random()) === 0) {
        mode = 'major';
    } else {
        mode = 'minor';
    }

    //checks for invalid key and chooses new one via recursion if necessary 
    if (invalidKeys.includes(`${key} ${mode}`)) {
        [key, mode] = selectKey();
    }
    return [key, mode];
}

module.exports = { selectKey };