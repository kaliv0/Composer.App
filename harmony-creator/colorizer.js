//colorizes given progression by inserting applied dominants, ii-v 'movements'
//and appends final cadence

const tonalMapper = require("../mappers/tonal-mapper");
const randomizer = require("../random-generators/randomizer");

function colorize(progression, tonalChords, mode, shouldApplyDominants) {
    const functions = [
        [8, 6],  //Tonic => main tonic written as 8 instead of 1 for computational reasons   
        [4, 2],  //Subdominant    
        [5]      //Dominant  
    ];

    const finalCadence = [100, 90, 80] //final cadence

    let colorizationIndex = 0;
    let colorizedProgression = [];
    colorizedProgression.push(progression[0]);

    //adds up to three applied dominants or mediants skipping first chord in given progression    
    let chord;
    let appliedChord;
    for (let i = 1; i < progression.length; i++) {
        chord = progression[i];

        if (colorizationIndex === 3) {
            colorizedProgression.push(chord);
            continue;
        }

        //colorizes 4th degree
        if (chord === 4) {
            if (shouldApplyDominants) {
                appliedChord = randomizer.randomIntFromInterval(0, 3);
                //adds applied dominant 7th
                if (appliedChord === 1) {
                    colorizedProgression.push(40);
                    colorizationIndex++;
                }
                //adds mediant between tonic and subdominant
                else if (appliedChord === 2 && progression[i - 1] === 8) {
                    colorizedProgression.push(3);
                    colorizationIndex++;
                }
                colorizedProgression.push(chord);
                continue;
            }

            appliedChord = randomizer.randomIntFromInterval(0, 2);
            //adds mediant between tonic and subdominant
            if (appliedChord === 1 && progression[i - 1] === 8) {
                colorizedProgression.push(3);
                colorizationIndex++;
            }
            colorizedProgression.push(chord);
            continue;
        }

        //avoids situations of type 'Gdim, G7, C7, Fm'
        if (mode === 'minor' && chord === 5 && progression[i - 1] === 2) {
            colorizedProgression.push(chord);
            continue;
        }

        //colorizes 6th degree
        if (chord === 6) {
            if (shouldApplyDominants) {
                appliedChord = randomizer.randomIntFromInterval(0, 4);
                //adds applied dominant 7th
                if (appliedChord === 1) {
                    colorizedProgression.push(60);
                    colorizationIndex++;
                }
                //adds mediant chord
                else if (appliedChord === 2) {
                    colorizedProgression.push(3);
                    colorizationIndex++;
                }
                //adds ii-v transition after tonic
                else if (appliedChord === 3 && progression[i - 1] === 8) {
                    colorizedProgression.push(7);

                    mode === 'major'
                        ? colorizedProgression.push(60)
                        : colorizedProgression.push(3);

                    colorizationIndex++;
                }
                colorizedProgression.push(chord);
                continue;
            }

            appliedChord = randomizer.randomIntFromInterval(0, 3);
            //adds mediant chord
            if (appliedChord === 1) {
                colorizedProgression.push(3);
                colorizationIndex++;
            }
            //adds ii-v transition after tonic
            else if (appliedChord === 2 && progression[i - 1] === 8 && mode === 'minor') {
                colorizedProgression.push(7);
                colorizedProgression.push(3);
                colorizationIndex++;
            }
            colorizedProgression.push(chord);
            continue;
        }

        //colorizes chords on other degrees
        if (shouldApplyDominants && progression[i] !== 8 && randomizer.randomBit() === 1) {
            colorizedProgression.push(chord * 10);
            colorizationIndex++;
        }
        colorizedProgression.push(chord);
    }

    //creates final authentic cadence
    if (colorizedProgression[colorizedProgression.length - 1] !== 5) {
        if (randomizer.randomBit() === 0 && colorizedProgression[colorizedProgression.length - 1] !== 8) {
            //adds double appoggiatura to dominant seventh chord  
            colorizedProgression.push(finalCadence[0]);
            colorizedProgression.push(finalCadence[2]);
        } else {
            //adds single leaning tone to dominant five chord     
            colorizedProgression.push(finalCadence[1]);
            colorizedProgression.push(functions[2][0]);
        }
    }
    else {  //turns last dominant from five to seventh chord
        colorizedProgression[colorizedProgression.length - 1] = finalCadence[2];
    }

    //adds final tonic
    colorizedProgression.push(functions[0][0]);
    return tonalMapper.materialize(colorizedProgression, tonalChords);
}

module.exports = { colorize };