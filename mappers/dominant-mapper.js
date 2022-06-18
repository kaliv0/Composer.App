const alterator = require('../alterators/note-alterator');

function translate(scale, root, mode) {
    if (mode === 'major') {
        const raiseThirdIndeces = [1, 2, 5, 6];
        const lowerSeventhIndeces = [0, 3];
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

            if (j === 2 && rootIndex === 6) {
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

    if (mode === 'minor') {
        const raiseThirdIndeces = [0, 1, 3, 4];
        const lowerSeventhIndeces = [2, 5];
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

            if (j === 2 && rootIndex === 1) {
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
}

module.exports = { translate };