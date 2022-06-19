//generates all main chords in given key and all their applied dominants
const { majSuffix, minSuffix, dimSuffix, seventhSuffix, susSuffix, minSuffixIndeces }
    = require("../constants/chordSuffixes");

function generateChords(scale, mode) {
    if (mode === 'major') {
        return generateInMajor(scale);
    }
    if (mode === 'minor') {
        return generateInMinor(scale);
    }
}

function generateInMajor(scale) {
    let chords = scale.reduce((acc, val, index) => {
        if (index === 0) {
            acc[8] = val;
            return acc;
        }

        if (minSuffixIndeces.includes(index)) {
            val += minSuffix;
        }
        if (index === 6) {
            val += dimSuffix
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
            chords[j] = scale[index] + majSuffix + seventhSuffix;
        }
        chords[j] = scale[index] + seventhSuffix;
        index++;
    }
    chords[90] = scale[4] + susSuffix;
    chords[100] = `${scale[0]}/${scale[4]}`;

    return chords;
}

function generateInMinor(scale) {
    let chords = scale.reduce((acc, val, index) => {
        if (index === 0) {
            acc[8] = val + minSuffix;
        } else {
            if (index === 1) {
                /* could be changed to diminished seventh chord */
                val += dimSuffix
            }
            if (index === 3) {
                val += minSuffix;
            }
            acc[index + 1] = val;
        }
        return acc;
    }, {});

    //creates applied dominants and cadential chords
    let index = 5;
    for (let j = 20; j <= 80; j += 10) {
        if (index === 5) {
            /* could be changed to French (flat five) chord */
            chords[j] = scale[index] + majSuffix;
        }
        if (index === 7) {
            index = 0;
        }
        chords[j] = scale[index] + seventhSuffix;
        index++;
    }
    chords[90] = scale[4] + susSuffix;
    chords[100] = `${scale[0]}/${scale[4]}`;

    return chords;
}

module.exports = { generateChords };
