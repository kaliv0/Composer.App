//randomly selects key to be constructed
const { accidentals } = require("../constants/chromaticSigns");
const { scalePitches } = require("../constants/pitches");
const { modeTypes } = require("../constants/modes");
const { invalidKeys } = require("../constants/keyValidations");
const { randomIndexIntervals, randomIntegerIndeces } = require("../constants/randoms");
const { randomIntegerFromInterval } = require('./randomizer');

function selectKey() {
    //chooses random key
    const randomIndex = randomIntegerFromInterval(randomIndexIntervals.MIN, randomIndexIntervals.MAX);
    let key = scalePitches[randomIndex];

    const randomInteger = randomIntegerFromInterval(randomIntegerIndeces.MIN, randomIntegerIndeces.MAX);
    if (randomInteger === randomIntegerIndeces.FIRST) {
        key += accidentals.SHARP;
    }
    if (randomInteger === randomIntegerIndeces.SECOND) {
        key += accidentals.FLAT;
    }

    let mode;
    if (Math.round(Math.random()) === randomIntegerIndeces.MIN) {
        mode = modeTypes.MAJOR
    } else {
        mode = modeTypes.MINOR;
    }

    //checks for invalid key and chooses new one via recursion if necessary 
    if (invalidKeys.includes(`${key} ${mode}`)) {
        [key, mode] = selectKey();
    }
    return [key, mode];
}

module.exports = { selectKey };