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
                currNote = raiseNote(currNote);
            }

            if (j === 2 && rootIndex === 6) {
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
                currNote = raiseNote(currNote);
            }

            if (j === 2 && rootIndex === 1) {
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
}

/*TODO => extract in separate module */
function raiseNote(note) {
    if (note.includes('#')) {
        note = note[0] + 'x'; 
    }
    else if (note.includes('b')) {
        note = note[0];
    }
    else {
        note = note + '#';
    }

    return note;
}

function lowerNote(note) {
    if (note.includes('#')) {
        note = note[0];
    } else {
        note = note + 'b';
    }

    return note;
}

module.exports = { translate, raiseNote };