//appends required chromatic signs for a given key signature
const { accidentals, CHROMATIC_SIGNS } = require("../constants/chromaticSigns");
const { majorCircleOfFifths } = require("../constants/pitches");
const { modeTypes } = require("../constants/modes");
const { INVALID_KEY_ERROR } = require("../constants/errorMessages");

function addChromaticSigns(scale, tonic, mode) {
    let signCount = majorCircleOfFifths[tonic];
    let isWithFlats = (tonic.charAt(1) === accidentals.FLAT || tonic === 'F');

    if (mode === modeTypes.MINOR) {
        if (isWithFlats) {
            signCount += 3;
        } else {
            signCount -= 3;
        }
    }

    if (signCount > 7) {
        throw new Error(INVALID_KEY_ERROR);
    }

    if (isWithFlats || signCount < 0) {
        if (signCount < 0) {
            signCount = Math.abs(signCount);
        }
        return addFlats(scale, signCount);
    }

    return addSharps(scale, signCount);
}

function addFlats(scale, signCount) {
    let currNote;
    let degreeIndex;
    for (let i = signCount; i > 0; i--) {
        currNote = CHROMATIC_SIGNS[CHROMATIC_SIGNS.length - i];
        degreeIndex = scale.indexOf(currNote);
        scale[degreeIndex] += accidentals.FLAT;
    }
    return scale;
}

function addSharps(scale, signCount) {
    let degreeIndex;
    for (let i = 0; i < signCount; i++) {
        degreeIndex = scale.indexOf(CHROMATIC_SIGNS[i]);
        scale[degreeIndex] += accidentals.SHARP;
    }
    return scale;
}

module.exports = { addChromaticSigns };
