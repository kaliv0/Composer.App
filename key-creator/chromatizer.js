//appends required chromatic signs for a given key signature
const { accidentals, chromaticSigns } = require("../constants/chromaticSings");
const { majorCircleOfFifths } = require("../constants/pitches");
const { invalidKeyError } = require("../constants/errorMessages");

function addChromaticSigns(scale, tonic, mode) {
    let signCount = majorCircleOfFifths[tonic];
    let isWithFlats = (tonic.charAt(1) === accidentals.FLAT || tonic === 'F');

    if (mode === 'minor') {
        if (isWithFlats) {
            signCount += 3;
        } else {
            signCount -= 3;
        }
    }

    if (signCount > 7) {
        throw new Error(invalidKeyError);
    }

    if (isWithFlats || signCount < 0) {
        if (signCount < 0) {
            signCount = Math.abs(signCount);
        }
        //adds flats
        for (let i = signCount; i > 0; i--) {
            let currNote = chromaticSigns[chromaticSigns.length - i];
            let degreeIndex = scale.indexOf(currNote);
            scale[degreeIndex] += accidentals.FLAT;
        }
    } else {
        //adds sharps
        for (let i = 0; i < signCount; i++) {
            let degreeIndex = scale.indexOf(chromaticSigns[i]);
            scale[degreeIndex] += accidentals.SHARP;
        }
    }
    return scale;
}

module.exports = { addChromaticSigns };
