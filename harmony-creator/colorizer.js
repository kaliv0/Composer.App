//colorizes given progression by inserting applied dominants, ii-v 'movements'
//and appends final cadence
const { materialize } = require("../mappers/tonal-mapper");
const { randomIntegerFromInterval, randomBit } = require("../random-generators/randomizer");
const { harmonicFunctions, finalCadence } = require("../constants/chords");
const { modeTypes } = require("../constants/modes");

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
            if (shouldApplyDominants) {
                colorizedProgression, colorizationIndex = colorizeFourthDegreeWithAppliedDominants(
                    chord, colorizedProgression, colorizationIndex,
                    progression, index, appliedChord
                );
                continue;
            }

            colorizedProgression, colorizationIndex = colorizeFourthDegree(
                chord, colorizedProgression, colorizationIndex,
                progression, index, appliedChord
            );
            continue;
        }

        //avoids situations of type 'Gdim, G7, C7, Fm'
        if (mode === modeTypes.MINOR && chord === 5 && progression[index - 1] === 2) {
            colorizedProgression.push(chord);
            continue;
        }

        //colorizes 6th degree
        if (chord === 6) {
            if (shouldApplyDominants) {
                colorizedProgression, colorizationIndex = colorizeSixthDegreeWithAppliedDominants(
                    chord, colorizedProgression, colorizationIndex,
                    progression, index, appliedChord, mode
                );
                continue;
            }

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
        //adds final tonic
        colorizedProgression.push(harmonicFunctions.TONIC[0]);
        return materialize(colorizedProgression, tonalChords);
    }
    //turns last dominant from five to seventh chord
    colorizedProgression[colorizedProgression.length - 1] = finalCadence.DOMINANT_SEVENTH;
    colorizedProgression.push(harmonicFunctions.TONIC[0]);
    return materialize(colorizedProgression, tonalChords);
}

function colorizeFourthDegree(
    chord, colorizedProgression, colorizationIndex, progression,
    index, appliedChord) {

    appliedChord = randomIntegerFromInterval(0, 2);
    //adds mediant between tonic and subdominant
    if (appliedChord === 1 && progression[index - 1] === 8) {
        colorizedProgression.push(3);
        colorizationIndex++;
    }
    colorizedProgression.push(chord);
    return colorizedProgression, colorizationIndex;
}

function colorizeFourthDegreeWithAppliedDominants(
    chord, colorizedProgression, colorizationIndex, progression,
    index, appliedChord) {

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

function colorizeSixthDegree(
    chord, colorizedProgression, colorizationIndex,
    progression, index, appliedChord, mode) {

    appliedChord = randomIntegerFromInterval(0, 3);
    //adds mediant chord
    if (appliedChord === 1) {
        colorizedProgression.push(3);
        colorizationIndex++;
    }
    //adds ii-v transition after tonic
    else if (mode === modeTypes.MINOR && appliedChord === 2 && progression[index - 1] === 8) {
        colorizedProgression.push(7);
        colorizedProgression.push(3);
        colorizationIndex++;
    }
    colorizedProgression.push(chord);
    return colorizedProgression, colorizationIndex;
}

function colorizeSixthDegreeWithAppliedDominants(
    chord, colorizedProgression, colorizationIndex,
    progression, index, appliedChord, mode) {

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

        if (mode === modeTypes.MAJOR) {
            colorizedProgression.push(60)
        } else {
            colorizedProgression.push(3);
        }
        colorizationIndex++;
    }

    colorizedProgression.push(chord);
    return colorizedProgression, colorizationIndex;
}

function createFinalAuthenticCadence(colorizedProgression) {
    if (randomBit() === 0 && colorizedProgression[colorizedProgression.length - 1] !== 8) {
        //adds double appoggiatura to dominant seventh chord  
        colorizedProgression.push(finalCadence.CADENTIAL_SIX_FOUR_CHORD);
        colorizedProgression.push(finalCadence.DOMINANT_SEVENTH);
        return colorizedProgression;
    }
    //adds single leaning tone to dominant five chord     
    colorizedProgression.push(finalCadence.SUSPENDED_DOMINANT);
    colorizedProgression.push(harmonicFunctions.DOMINANT[0]);
    return colorizedProgression;
}

module.exports = { colorize };