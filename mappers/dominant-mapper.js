const alterator = require('../alterators/note-alterator');

function translate(scale, root, mode) {
    let raiseThirdIndeces;
    let lowerSeventhIndeces;
    let rootIndex;
    let scaleIndex;
    let raisedFiveIndex;
    let currNote;
    let fullChord = [];

    if (mode === 'major') {
        raiseThirdIndeces = [1, 2, 5, 6];
        lowerSeventhIndeces = [0, 3];
        rootIndex = scale.indexOf(root);
        scaleIndex = rootIndex;
        raisedFiveIndex = 6;
        fullChord = [];
        currNote;
    } else {
        //sets variables for minor mode
        raiseThirdIndeces = [0, 1, 3, 4];
        lowerSeventhIndeces = [2, 5];
        rootIndex = scale.indexOf(root);
        scaleIndex = rootIndex;
        raisedFiveIndex = 1;
        fullChord = [];
        currNote;
    }

    //reads other notes above root and adds accidentals where necessary
    for (let j = 0; j < 4; j++) {
        currNote = scale[scaleIndex];

        if (j === 1 && raiseThirdIndeces.includes(rootIndex)) {
            currNote = alterator.raiseNote(currNote);
        }

        if (j === 2 && rootIndex === raisedFiveIndex) {
            currNote = alterator.raiseNote(currNote);
        }

        if (j === 3 && lowerSeventhIndeces.includes(rootIndex)) {
            currNote = alterator.lowerNote(currNote);
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

module.exports = { translate };