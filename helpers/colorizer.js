const randomizer = require("./randomizer");

function colorize(progression, tonalChords) {
    const functions = [
        [8, 6],  //Tonic => main tonic written as 8 instead of 1 for computational reasons   
        [4, 2],  //Subdominant    
        [5]      //Dominant  
    ];

    const finalCadence = [100, 90, 80] //final cadence

    let colorizationIndex = 0;
    let colorizedProgression = [];
    colorizedProgression.push(progression[0]);

    //adds up to three applied dominants skipping first chord in given progression    
    let chord;
    for (let i = 1; i < progression.length; i++) {
        chord = progression[i];

        if (colorizationIndex === 3) {
            colorizedProgression.push(chord);
            continue;
        }

        if (chord === 4 && progression[i - 1] === 8) {
            let appliedChord = randomizer.randomIntFromInterval(0, 3);
            if (appliedChord === 1) {
                colorizedProgression.push(40);
                colorizationIndex++;
            }
            //adds mediant between tonic and subdominant
            else if (appliedChord === 2) {
                colorizedProgression.push(3);
                colorizationIndex++;
            }
            colorizedProgression.push(chord);
            continue;
        }

       //todo => colorizing 6th degree

        if (progression[i] !== 8 && randomizer.randomBit() === 1) {
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

    //maps progression to chords in particular key
    //could be modified to any major or minor tonality
    let result = colorizedProgression.reduce((acc, val) => {
        return acc += `${tonalChords[val]}, `;
    }, '');

    return result.substring(0, result.length - 2);
}

module.exports = { colorize };