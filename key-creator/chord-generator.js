//generates all main chords in given key and all their applied dominants

function generateChords(scale, mode) {
    let chords = {};
    let majSuffix = 'maj';
    let minSuffix = 'm';
    let dimSuffix = 'dim';
    let seventhSuffix = '7';
    let susSuffix = 'sus';

    if (mode === 'major') {
        //creates main chords
        // for (let i = 1; i < scale.length; i++) {
        //     if (i === 1 || i === 2 || i === 5) {
        //         chords[i + 1] = scale[i] + minSuffix;
        //     }
        //     else if (i === 6) {
        //         chords[i + 1] = scale[i] + dimSuffix
        //     }
        //     else {
        //         chords[i + 1] = scale[i];
        //     }
        // }

        //===============
        chords = scale.reduce((acc, val, index) => {
            if (index === 0) {
                acc[8] = val;
            }
            else if (index === 1 || index === 2 || index === 5) {
                acc[index + 1] = val + minSuffix;
            }
            else if (index === 6) {
                acc[index + 1] = val + dimSuffix
            }
            else if (index === 3 || index === 4 || index === 7) {
                acc[index + 1] = val;
            }
            return acc;
        }, {});
        //==================

        //chords[8] = scale[0];

        //creates applied dominants and cadential chords
        let index = 5;
        for (let j = 20; j <= 80; j += 10) {
            if (index === 3) {
                scale[index] += majSuffix;
            }
            if (index === 7) {
                index = 0;
            }
            chords[j] = scale[index] + seventhSuffix;
            index++;
        }

        chords[90] = scale[4] + susSuffix;
        //chords[100] = scale[0] + '/' + scale[4];
        chords[100] = `${scale[0]}/${scale[4]}`;
    }
    else if (mode === 'minor') {
        //creates main chords
        for (let i = 1; i < scale.length; i++) {
            if (i === 1) {
                //chords[i + 1] = scale[i] + dimSuffix + seventhSuffix;
                chords[i + 1] = scale[i] + dimSuffix;
            }
            else if (i === 3) {
                chords[i + 1] = scale[i] + minSuffix;
            }
            else {
                chords[i + 1] = scale[i];
            }
        }
        chords[8] = scale[0] + minSuffix;

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
        //chords[100] = scale[0] + '/' + scale[4];
        chords[100] = `${scale[0]}/${scale[4]}`;
    }
    return chords;
}

module.exports = { generateChords };
