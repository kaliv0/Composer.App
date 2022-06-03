function translate(scale, root, mode) {
    if (mode === 'major') {
        const raiseThirdIndeces = [1, 2, 5, 6];
        const lowerSeventhIndeces = [0, 3];
        let fullChord = [];
        let rootIndex = scale.indexOf(root);
        let scaleIndex = rootIndex;
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

    //TODO: implement for minor tonalities
}

function raiseNote(note) {
    if (note.includes('#')) {
        note = currNote[0] + 'x';
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

module.exports = { translate };