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
                //should be extracted as separate function
                if (currNote.includes('#')) {
                    currNote = currNote[0] + 'x';
                }
                else if (currNote.includes('b')) {
                    currNote = currNote[0];
                }
                else {
                    currNote = currNote + '#';
                }
            }

            if (j === 2 && rootIndex === 6) {
                if (currNote.includes('#')) {
                    currNote = currNote[0] + 'x';
                }
                else if (currNote.includes('b')) {
                    currNote = currNote[0];
                }
                else {
                    currNote = currNote + '#';
                }
            }

            if (j === 3 && (rootIndex === 0 || rootIndex === 3)) {
                if (currNote.includes('#')) {
                    currNote = currNote[0];
                } else {
                    currNote = currNote + 'b';
                }
            }

            fullChord.push(currNote);
            //keeps index within octave boundaries
            scaleIndex = scaleIndex + 2 >= 7 ? scaleIndex - 5 : scaleIndex + 2;
        }

        return fullChord;
    }
}

module.exports = { translate };