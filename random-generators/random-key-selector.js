//randomly selects key to be constructed
const { randomIndexIntervals, randomIntegerIndeces } = require("../constants/randoms");
const { INVALID_KEYS } = require("../constants/keyValidations");
const { SCALE_PITCHES } = require("../constants/pitches");
const { accidentals } = require("../constants/chromaticSigns");
const { modeTypes } = require("../constants/modes");
const { randomIntegerFromInterval } = require('./randomizer');

function selectKey() {
    //chooses random key
    const randomIndex = randomIntegerFromInterval(randomIndexIntervals.MIN, randomIndexIntervals.MAX);
    let key = SCALE_PITCHES[randomIndex];

    const randomInteger = randomIntegerFromInterval(randomIntegerIndeces.MIN, randomIntegerIndeces.MAX);
    if (randomInteger === randomIntegerIndeces.PRIMARY) {
        key += accidentals.SHARP;
    }
    if (randomInteger === randomIntegerIndeces.SECONDARY) {
        key += accidentals.FLAT;
    }

    let mode;
    if (Math.round(Math.random()) === randomIntegerIndeces.MIN) {
        mode = modeTypes.MAJOR
    } else {
        mode = modeTypes.MINOR;
    }

    //checks for invalid key and chooses new one via recursion if necessary 
    if (INVALID_KEYS.includes(`${key} ${mode}`)) {
        [key, mode] = selectKey();
    }
    return [key, mode];
}

module.exports = { selectKey };