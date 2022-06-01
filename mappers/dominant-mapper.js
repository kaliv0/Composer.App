function translate(scale, root, mode) {
    if (mode === 'major') {
        let fullChord = [];
        let rootIndex = scale.indexOf(root);
        let scaleIndex = rootIndex;
        let currNote;

        //reads other notes above root
        for (let j = 0; j < 4; j++) {
            currNote = scale[scaleIndex];

            if (j === 1 && (rootIndex === 1 || rootIndex === 2 || rootIndex === 5 || rootIndex === 6)) {
                currNote = raiseNote(currNote);
            }

            if (j === 2 && rootIndex === 6) {
                currNote = raiseNote(currNote);
            }

            if (j === 3 && (rootIndex === 0 || rootIndex === 3)) {
                currNote = lowerNote(currNote);
            }

            fullChord.push(currNote);
            //keeps index within octave boundaries
            scaleIndex = scaleIndex + 2 >= 7 ? scaleIndex - 5 : scaleIndex + 2;
        }

        return fullChord;
    }
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