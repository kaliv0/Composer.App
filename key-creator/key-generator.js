//creates main scale of given key
const { scalePitches } = require("../constants/pitches");
const { validKeyName } = require("../constants/keyValidations");
const { invalidKeyError } = require("../constants/errorMessages");
const { addChromaticSigns } = require("./chromatizer");

function generateKey(tonality) {
    if (!validKeyName.test(tonality)) {
        console.error(invalidKeyError);
        return;
    }

    const [tonic, mode] = tonality.split(' ');
    let pitchIndex = scalePitches.indexOf(tonic.charAt(0));

    //populates scale degrees
    let newKey = [];
    for (let i = 0; i < 7; i++) {
        newKey.push(scalePitches[pitchIndex]);

        if (pitchIndex < scalePitches.length - 1) {
            pitchIndex++;
        } else {
            pitchIndex = 0;
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
