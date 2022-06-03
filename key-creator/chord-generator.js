//generates all main chords in given key and all their applied dominants
function generateChords(scale, mode) {
    const majSuffix = 'maj';
    const minSuffix = 'm';
    const dimSuffix = 'dim';
    const seventhSuffix = '7';
    const susSuffix = 'sus';
    const minSuffixIndeces = [1, 2, 5];
    let chords = {};

    if (mode === 'major') {
        chords = scale.reduce((acc, val, index) => {
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
    }
    if (mode === 'minor') {
        chords = scale.reduce((acc, val, index) => {
            if (index === 0) {
                acc[8] = val + minSuffix;
            } else {
                if (index === 1) {
                    val += dimSuffix //could be changed to diminished seventh chord
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
                scale[index] += majSuffix; //could be changed to French (flat five) chord
            }
            if (index === 7) {
                index = 0;
            }
            chords[j] = scale[index] + seventhSuffix;
            index++;
        }
        chords[90] = scale[4] + susSuffix;
        chords[100] = `${scale[0]}/${scale[4]}`;
    }
    return chords;
}

module.exports = { generateChords };
