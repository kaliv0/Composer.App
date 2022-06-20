//reads notes above root in dominant cords and adds accidentals where necessary
const { raiseNote, lowerNote } = require('../alterators/note-alterator');
const { modeTypes } = require("../constants/modes");
const { majorDominant, minorDominant } = require("../constants/dominantIndeces");

function translateDominant(scale, root, mode) {
    let raiseThirdIndeces;
    let lowerSeventhIndeces;
    let raiseFiveIndex;

    if (mode === modeTypes.MAJOR) {
        raiseThirdIndeces = majorDominant.RAISE_THIRD_INDECES;
        lowerSeventhIndeces = majorDominant.LOWER_SEVENTH_INDECES;
        raiseFiveIndex = majorDominant.RAISE_FIVE_INDEX;
    } else {
        raiseThirdIndeces = minorDominant.RAISE_THIRD_INDECES;
        lowerSeventhIndeces = minorDominant.LOWER_SEVENTH_INDECES;
        raiseFiveIndex = minorDominant.RAISE_FIVE_INDEX;
    }

    let rootIndex = scale.indexOf(root);
    let scaleIndex = rootIndex;
    let fullChord = [];
    let currNote;

    for (let j = 0; j < 4; j++) {
        currNote = scale[scaleIndex];

        if (j === 1 && raiseThirdIndeces.includes(rootIndex)) {
            currNote = raiseNote(currNote);
        }

        if (j === 2 && raiseFiveIndex.includes(rootIndex)) {
            currNote = raiseNote(currNote);
        }

        if (j === 3 && lowerSeventhIndeces.includes(rootIndex)) {
            currNote = lowerNote(currNote);
        }

        fullChord.push(currNote);
        //keeps index within octave boundaries
        if (scaleIndex + 2 >= 7) {
            scaleIndex -= 5;
        } else {
            scaleIndex += 2;
        }
    }
    return fullChord;
}

module.exports = { translateDominant };