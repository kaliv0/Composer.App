//maps chord abbreviations to full representation of the chords
const { translateDominant } = require("./dominant-mapper");
const { raiseNote } = require('../alterators/note-alterator');
const { accidentals } = require("../constants/chromaticSigns");
const { chordSuffixes } = require("../constants/chords");
const { modeTypes } = require("../constants/modes");

function display(progression, scale, mode) {
    let root;
    let signChar;
    let fullChord;
    let scaleIndex;
    let notesCount;

    let chordTable = progression.reduce((acc, chord) => {
        signChar = chord.charAt(1);
        //finds chord root
        if (signChar === accidentals.SHARP || signChar === accidentals.FLAT) {
            root = chord.substring(0, 2);
        } else {
            root = chord.charAt(0);
        }

        //calculates if is triad or seventh chord
        if (chord.slice(-1) === '7') {
            notesCount = 4;
        } else {
            notesCount = 3;
        }

        if (notesCount === 4) {
            fullChord = translateDominant(scale, root, mode);
            acc.push({
                name: chord,
                content: fullChord,
            });
            return acc;
        }

        const rootIndex = scale.indexOf(root);
        fullChord, scaleIndex = readOtherNotesAboveRoot(
            fullChord = [], scaleIndex = rootIndex,
            scale, rootIndex, notesCount, mode);

        //maps abbrevation to full chord
        acc.push({
            name: chord,
            content: fullChord,
        });
        return acc;
    }, []);

    //adjusts suspended chord if any 
    if (chordTable.some(ch => ch.name.includes(chordSuffixes.SUSPENDED))) {
        //there could be no more than one suspended chord in the progression
        let susIndex = chordTable.findIndex(ch => ch.name.includes(chordSuffixes.SUSPENDED));

        let middleIndex = scale.indexOf(chordTable[susIndex].content[1]);
        //keeps index within octave boundaries
        if (middleIndex + 1 >= 7) {
            middleIndex -= 6;
        } else {
            middleIndex++;
        }

        chordTable[susIndex].content[1] = scale[middleIndex];
    }

    //аdjusts K46 chord if any
    if (chordTable.some(ch => ch.name.includes('/'))) {
        //there could be no more than one K64 chord in the progression
        let cadentialIndex = chordTable.findIndex(ch => ch.name.includes('/'));
        let bassNote = chordTable[cadentialIndex].content.pop();
        chordTable[cadentialIndex].content.unshift(bassNote);
    }
    return chordTable;
}

function readOtherNotesAboveRoot(fullChord, scaleIndex, scale, rootIndex, notesCount, mode) {
    for (let j = 0; j < notesCount; j++) {
        if (mode === modeTypes.MINOR && rootIndex === 4 && j === 1) {
            //alters chord on fifth degree in minor mode
            fullChord.push(raiseNote(scale[scaleIndex]));
        } else {
            fullChord.push(scale[scaleIndex]);
        }

        //keeps index within octave boundaries
        if (scaleIndex + 2 >= 7) {
            scaleIndex -= 5;
        } else {
            scaleIndex += 2;
        }
    }
    return fullChord, scaleIndex;
}

module.exports = { display };