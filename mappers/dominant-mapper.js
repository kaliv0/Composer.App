const alterator = require('../alterators/note-alterator');

function translate(scale, root, mode) {
    let raiseThirdIndeces;
    let lowerSeventhIndeces;
    let raisedFiveIndex;

    if (mode === 'major') {
        raiseThirdIndeces = [1, 2, 5, 6];
        lowerSeventhIndeces = [0, 3];
        raisedFiveIndex = 6;
    } else {
        //sets variables for minor mode
        raiseThirdIndeces = [0, 1, 3, 4];
        lowerSeventhIndeces = [2, 5];
        raisedFiveIndex = 1;
    }

    let rootIndex = scale.indexOf(root);
    let scaleIndex = rootIndex;
    let fullChord = [];
    let currNote;

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