//generates all main chords in given key and all their applied dominants
const { modeTypes } = require("../constants/modes");
const { chordSuffixes } = require("../constants/chords");

function generateChords(scale, mode) {
    if (mode === modeTypes.MAJOR) {
        return generateInMajor(scale);
    }
    if (mode === modeTypes.MINOR) {
        return generateInMinor(scale);
    }
}

function generateInMajor(scale) {
    let chords = scale.reduce((acc, val, index) => {
        if (index === 0) {
            acc[8] = val;
            return acc;
        }

        if (chordSuffixes.MINOR_INDECES.includes(index)) {
            val += chordSuffixes.MINOR;
        }
        if (index === 6) {
            val += chordSuffixes.DIMINISHED
        }
        acc[index + 1] = val;
        return acc;
    }, {});

    //creates applied dominants and cadential chords
    let index = 5;
    for (let j = 20; j <= 80; j += 10) {
        if (index === 7) {
            index = 0;
        }
        if (index === 3) {
            chords[j] = scale[index] + chordSuffixes.MAJOR + chordSuffixes.SEVENTH;
        }
        chords[j] = scale[index] + chordSuffixes.SEVENTH;
        index++;
    }

    return addSuspendedDominant(chords, scale);
}

function generateInMinor(scale) {
    let chords = scale.reduce((acc, val, index) => {
        if (index === 0) {
            acc[8] = val + chordSuffixes.MINOR;
            return acc;
        }

        if (index === 1) {
            /* could be changed to diminished seventh chord */
            val += chordSuffixes.DIMINISHED
        }
        if (index === 3) {
            val += chordSuffixes.MINOR;
        }
        acc[index + 1] = val;
        return acc;
    }, {});

    //creates applied dominants and cadential chords
    let index = 5;
    for (let j = 20; j <= 80; j += 10) {
        if (index === 5) {
            /* could be changed to French (flat five) chord */
            chords[j] = scale[index] + chordSuffixes.MAJOR;
        }
        if (index === 7) {
            index = 0;
        }
        chords[j] = scale[index] + chordSuffixes.SEVENTH;
        index++;
    }

    chords = addSuspendedDominant(chords, scale);
    return chords;
}

function addSuspendedDominant(chords, scale) {
    chords[90] = scale[4] + chordSuffixes.SUSPENDED;
    chords[100] = `${scale[0]}/${scale[4]}`;
    return chords;
}

module.exports = { generateChords };
