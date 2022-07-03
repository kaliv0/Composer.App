//maps chord abbreviations to full representation of the chords
const { accidentals } = require("../constants/chromaticSigns");
const { scaleAttributes } = require("../constants/scales");
const { modeTypes } = require("../constants/modes");
const { chordSuffixes, chordToneIndexes } = require("../constants/chords");
const { translateDominant } = require("./dominant-mapper");
const { raiseNote } = require('../alterators/note-alterator');

function display(progression, scale, mode) {
    let root;
    let signChar;
    let fullChord;
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
        if (chord.slice(-1) === chordSuffixes.SEVENTH) {
            notesCount = chordToneIndexes.DOMINANT_NOTE_COUNT;
        } else {
            notesCount = chordToneIndexes.TRIAD_NOTE_COUNT;
        }

        if (notesCount === chordToneIndexes.DOMINANT_NOTE_COUNT) {
            fullChord = translateDominant(scale, root, mode);
            acc.push({
                name: chord,
                content: fullChord,
            });
            return acc;
        }

        const rootIndex = scale.indexOf(root);
        fullChord = readOtherNotesAboveRoot(
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
        if (middleIndex + scaleAttributes.SUSPENDED_CHORD_INCREMENTER >= scaleAttributes.DEGREE_COUNT) {
            middleIndex -= scaleAttributes.SUSPENDED_CHORD_DECREMENTER;
        } else {
            middleIndex += scaleAttributes.SUSPENDED_CHORD_INCREMENTER;
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

function readOtherNotesAboveRoot(scale, rootIndex, notesCount, mode) {
    let fullChord = [];
    let scaleIndex = rootIndex;
    for (let j = chordToneIndexes.ROOT; j < notesCount; j++) {
        if (mode === modeTypes.MINOR && rootIndex === 4 && j === chordToneIndexes.THIRD) {
            //alters chord on fifth degree in minor mode
            fullChord.push(raiseNote(scale[scaleIndex]));
        } else {
            fullChord.push(scale[scaleIndex]);
        }

        //keeps index within octave boundaries
        if (scaleIndex + scaleAttributes.INCREMENTER >= scaleAttributes.DEGREE_COUNT) {
            scaleIndex -= scaleAttributes.DECREMENTER;
        } else {
            scaleIndex += scaleAttributes.INCREMENTER;
        }
    }
    return fullChord;
}

module.exports = { display };