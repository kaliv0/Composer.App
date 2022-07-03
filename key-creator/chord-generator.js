//generates all main chords in given key and all their applied dominants
const { chordSuffixes, MINOR_CHORD_DEGREE_INDECES } = require("../constants/chords");
const { modeTypes } = require("../constants/modes");

function generateChords(scale, mode) {
    if (mode === modeTypes.MAJOR) {
        return generateInMajor(scale);
    }
    if (mode === modeTypes.MINOR) {
        return generateInMinor(scale);
    }
}

function generateInMajor(scale) {
    let chords = scale.reduce((chordList, scaleDegree, index) => {
        if (index === 0) {
            chordList[8] = scaleDegree;
            return chordList;
        }

        if (MINOR_CHORD_DEGREE_INDECES.includes(index)) {
            scaleDegree += chordSuffixes.MINOR;
        }
        if (index === 6) {
            scaleDegree += chordSuffixes.DIMINISHED
        }
        chordList[index + 1] = scaleDegree;
        return chordList;
    }, {});

    //creates applied dominants and cadential chords
    let degreeIndex = 5;
    for (let j = 20; j <= 80; j += 10) {
        if (degreeIndex === 7) {
            degreeIndex = 0;
        }
        if (degreeIndex === 3) {
            chords[j] = scale[degreeIndex] + chordSuffixes.MAJOR + chordSuffixes.SEVENTH;
        }
        chords[j] = scale[degreeIndex] + chordSuffixes.SEVENTH;
        degreeIndex++;
    }
    return addSuspendedDominant(chords, scale);
}

function generateInMinor(scale) {
    let chords = scale.reduce((chordList, scaleDegree, index) => {
        if (index === 0) {
            chordList[8] = scaleDegree + chordSuffixes.MINOR;
            return chordList;
        }

        if (index === 1) {
            /* could be changed to diminished seventh chord */
            scaleDegree += chordSuffixes.DIMINISHED
        }
        if (index === 3) {
            scaleDegree += chordSuffixes.MINOR;
        }
        chordList[index + 1] = scaleDegree;
        return chordList;
    }, {});

    //creates applied dominants and cadential chords
    let degreeIndex = 5;
    for (let j = 20; j <= 80; j += 10) {
        if (degreeIndex === 5) {
            /* could be changed to French (flat five) chord */
            chords[j] = scale[degreeIndex] + chordSuffixes.MAJOR;
        }
        if (degreeIndex === 7) {
            degreeIndex = 0;
        }
        chords[j] = scale[degreeIndex] + chordSuffixes.SEVENTH;
        degreeIndex++;
    }
    return addSuspendedDominant(chords, scale);
}

function addSuspendedDominant(chords, scale) {
    chords[90] = scale[4] + chordSuffixes.SUSPENDED;
    chords[100] = `${scale[0]}/${scale[4]}`;
    return chords;
}

module.exports = { generateChords };
