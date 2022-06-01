//maps chord abbreviations to full representation of the chords

/*TODO:
    add accidentals to applied dominant chords
*/
function display(progression, scale) {
    let root;
    let signChar;
    let fullChord;
    let notesCount;

    let chordTable = progression.reduce((acc, chord) => {
        signChar = chord.charAt(1);
        //finds chord root
        if (signChar === '#' || signChar === 'b') {
            root = chord.substring(0, 2);
        } else {
            root = chord.charAt(0);
        }

        notesCount = chord.slice(-1) === '7' ? 4 : 3;

        fullChord = [];
        let scaleIndex = scale.indexOf(root);
        //reads other notes above root
        for (let j = 0; j < notesCount; j++) {
            fullChord.push(scale[scaleIndex]);
            //refactor with ternary operator
            if (scaleIndex + 2 >= 7) {
                scaleIndex -= 5;
            }
            else {
                scaleIndex += 2;
            }
        }
        //maps abbrevation to full chord
        acc.push({
            Name: chord,
            Content: fullChord,
        });

        return acc;
    }, []);

    //adjusts suspended chord if any 
    if (chordTable.some(ch => ch.Name.includes('sus'))) {
        //there could be no more than one suspended chord in the progression
        let susIndex = chordTable.findIndex(ch => ch.Name.includes('sus'));

        let middleIndx = scale.indexOf(chordTable[susIndex].Content[1]);
        //refactor with ternary operator
        if (middleIndx + 1 >= 7) {
            middleIndx -= 6;
        }
        else {
            middleIndx++;
        }

        chordTable[susIndex].Content[1] = scale[middleIndx];
    }

    //аdjusts K46 chord if any
    if (chordTable.some(ch => ch.Name.includes('/'))) {
        //there could be no more than one K64 chord in the progression
        let cadIndex = chordTable.findIndex(ch => ch.Name.includes('/'));
        let bassNote = chordTable[cadIndex].Content.pop();
        chordTable[cadIndex].Content.unshift(bassNote);
    }

    return chordTable;
}

module.exports = { display };