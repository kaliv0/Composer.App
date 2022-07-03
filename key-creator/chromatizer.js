//appends required chromatic signs for a given key signature
const { SIGN_INCREMENTAL_STEP, CHROMATIC_SIGNS, accidentals, chromaticSignCount } = require("../constants/chromaticSigns");
const { INVALID_KEY_ERROR } = require("../constants/errorMessages");
const { majorCircleOfFifths } = require("../constants/pitches");
const { modeTypes } = require("../constants/modes");

function addChromaticSigns(scale, tonic, mode) {
    let signCount = majorCircleOfFifths[tonic];
    let isWithFlats = (tonic.charAt(1) === accidentals.FLAT || tonic === 'F');

    if (mode === modeTypes.MINOR) {
        if (isWithFlats) {
            signCount += SIGN_INCREMENTAL_STEP;
        } else {
            signCount -= SIGN_INCREMENTAL_STEP;
        }
    }

    if (signCount > chromaticSignCount.MAX) {
        throw new Error(INVALID_KEY_ERROR);
    }

    if (isWithFlats || signCount < chromaticSignCount.MIN) {
        if (signCount < chromaticSignCount.MIN) {
            signCount = Math.abs(signCount);
        }
        return addFlats(scale, signCount);
    }

    return addSharps(scale, signCount);
}

function addFlats(scale, signCount) {
    let currNote;
    let degreeIndex;
    for (let i = signCount; i > chromaticSignCount.MIN; i--) {
        currNote = CHROMATIC_SIGNS[CHROMATIC_SIGNS.length - i];
        degreeIndex = scale.indexOf(currNote);
        scale[degreeIndex] += accidentals.FLAT;
    }
    return scale;
}

function addSharps(scale, signCount) {
    let degreeIndex;
    for (let i = chromaticSignCount.MIN; i < signCount; i++) {
        degreeIndex = scale.indexOf(CHROMATIC_SIGNS[i]);
        scale[degreeIndex] += accidentals.SHARP;
    }
    return scale;
}

module.exports = { addChromaticSigns };
