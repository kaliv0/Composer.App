/*
TODO => implement for minor keys
-refactor suffix concatenation
*/

function generateChords(scale, mode) {
    let chords = {};
    let suffix = '';

    if (mode === 'major') {
        //creates main chords
        for (let i = 1; i < scale.length; i++) {
            if (i === 1 || i === 2 || i === 5) {
                suffix = 'm';
            }
            else if (i === 6) {
                suffix = 'dim';
            }
            else {
                suffix = '';
            }
            chords[i + 1] = scale[i] + suffix;
        }
        chords[8] = scale[0];

        //creates applied dominants and cadential chords
        let index = 5;
        for (let j = 20; j <= 80; j += 10) {
            if (index === 3) {
                scale[index] += 'maj';
            }
            if (index === 7) {
                index = 0;
            }

            chords[j] = scale[index] + '7';
            index++;
        }

        chords[90] = scale[4] + 'sus';
        chords[100] = scale[0] + '/' + scale[4];
    }
    return chords;
}

module.exports = { generateChords };
