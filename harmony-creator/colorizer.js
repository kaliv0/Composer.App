//colorizes given progression by inserting applied dominants, ii-v 'movements'
//and appends final cadence
const { materialize } = require("../mappers/tonal-mapper");
const { randomIntegerFromInterval, randomBit } = require("../random-generators/randomizer");
const { harmonicFunctions, finalCadence } = require("../constants/chords")

function colorize(progression, tonalChords, mode, shouldApplyDominants) {
    let colorizationIndex = 0;
    let colorizedProgression = [];
    colorizedProgression.push(progression[0]);

    //adds up to three applied dominants or mediants skipping first chord in given progression    
    let chord;
    let appliedChord;
    for (let index = 1; index < progression.length; index++) {
        chord = progression[index];

        if (colorizationIndex === 3) {
            colorizedProgression.push(chord);
            continue;
        }

        //colorizes 4th degree
        if (chord === 4) {
            colorizedProgression, colorizationIndex = colorizeFourthDegree(
                chord, colorizedProgression, colorizationIndex, progression,
                index, shouldApplyDominants, appliedChord
            );
            continue;
        }

        //avoids situations of type 'Gdim, G7, C7, Fm'
        if (mode === 'minor' && chord === 5 && progression[index - 1] === 2) {
            colorizedProgression.push(chord);
            continue;
        }

        //colorizes 6th degree
        if (chord === 6) {
            colorizedProgression, colorizationIndex = colorizeSixthDegree(
                chord, colorizedProgression, colorizationIndex, progression,
                index, shouldApplyDominants, appliedChord, mode
            );
            continue;
        }

        //colorizes chords on other degrees
        if (shouldApplyDominants && progression[index] !== 8 && randomBit() === 1) {
            colorizedProgression.push(chord * 10);
            colorizationIndex++;
        }
        colorizedProgression.push(chord);
    }

    if (colorizedProgression[colorizedProgression.length - 1] !== 5) {
        colorizedProgression = createFinalAuthenticCadence(colorizedProgression);
    }
    else {  //turns last dominant from five to seventh chord
        colorizedProgression[colorizedProgression.length - 1] = finalCadence[2];
    }

    //adds final tonic
    colorizedProgression.push(harmonicFunctions.tonic[0]);
    return materialize(colorizedProgression, tonalChords);
}

function colorizeFourthDegree(
    chord, colorizedProgression, colorizationIndex, progression,
    index, shouldApplyDominants, appliedChord) {

    if (shouldApplyDominants) {
        appliedChord = randomIntegerFromInterval(0, 3);
        //adds applied dominant 7th
        if (appliedChord === 1) {
            colorizedProgression.push(40);
            colorizationIndex++;
        }
        //adds mediant between tonic and subdominant
        else if (appliedChord === 2 && progression[index - 1] === 8) {
            colorizedProgression.push(3);
            colorizationIndex++;
        }
        colorizedProgression.push(chord);
        return colorizedProgression, colorizationIndex;
    }

    appliedChord = randomIntegerFromInterval(0, 2);
    //adds mediant between tonic and subdominant
    if (appliedChord === 1 && progression[index - 1] === 8) {
        colorizedProgression.push(3);
        colorizationIndex++;
    }
    colorizedProgression.push(chord);
    return colorizedProgression, colorizationIndex;
}

function colorizeSixthDegree(
    chord, colorizedProgression, colorizationIndex, progression,
    index, shouldApplyDominants, appliedChord, mode) {

    if (shouldApplyDominants) {
        appliedChord = randomIntegerFromInterval(0, 4);
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
        else if (appliedChord === 3 && progression[index - 1] === 8) {
            colorizedProgression.push(7);

            mode === 'major'
                ? colorizedProgression.push(60)
                : colorizedProgression.push(3);

            colorizationIndex++;
        }
        colorizedProgression.push(chord);
        return colorizedProgression, colorizationIndex;
    }

    appliedChord = randomIntegerFromInterval(0, 3);
    //adds mediant chord
    if (appliedChord === 1) {
        colorizedProgression.push(3);
        colorizationIndex++;
    }
    //adds ii-v transition after tonic
    else if (appliedChord === 2 && progression[index - 1] === 8 && mode === 'minor') {
        colorizedProgression.push(7);
        colorizedProgression.push(3);
        colorizationIndex++;
    }
    colorizedProgression.push(chord);
    return colorizedProgression, colorizationIndex;
}

function createFinalAuthenticCadence(colorizedProgression) {
    if (randomBit() === 0 && colorizedProgression[colorizedProgression.length - 1] !== 8) {
        //adds double appoggiatura to dominant seventh chord  
        colorizedProgression.push(finalCadence[0]);
        colorizedProgression.push(finalCadence[2]);
    } else {
        //adds single leaning tone to dominant five chord     
        colorizedProgression.push(finalCadence[1]);
        colorizedProgression.push(harmonicFunctions.dominant[0]);
    }
    return colorizedProgression;
}

module.exports = { colorize };