//creates main scale of given key
const { KEY_SEPARATOR } = require("../constants/modes");
const { INVALID_KEY_ERROR } = require("../constants/errorMessages");
const { VALID_KEY_NAME } = require("../constants/keyValidations");
const { SCALE_PITCHES } = require("../constants/pitches");
const { scaleCounter } = require("../constants/scales");
const { addChromaticSigns } = require("./chromatizer");

function generateKey(tonality) {
    if (!VALID_KEY_NAME.test(tonality)) {
        console.error(INVALID_KEY_ERROR);
        return;
    }

    const [tonic, mode] = tonality.split(KEY_SEPARATOR);
    let pitchIndex = SCALE_PITCHES.indexOf(tonic.charAt(0));

    //populates scale degrees
    let newKey = [];
    for (let i = scaleCounter.START_INDEX; i < scaleCounter.UPPER_BOUND; i++) {
        newKey.push(SCALE_PITCHES[pitchIndex]);

        if (pitchIndex < SCALE_PITCHES.length - 1) {
            pitchIndex++;
        } else {
            pitchIndex = scaleCounter.START_INDEX;
        }
    }
    //error handling needed if user selects key manually
    try {
        return addChromaticSigns(newKey, tonic, mode);
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = { generateKey };