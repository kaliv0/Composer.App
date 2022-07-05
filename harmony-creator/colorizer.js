//colorizes given progression by inserting applied dominants, ii-v 'movements'
//and appends final cadence
const { harmonicFunctions, chordIndeces, rootDegrees, APPLIED_DOMINANT_COEFFICIENT, COLORIZATION_RANGE } = require("../constants/chords");
const { randomBitStates, randomIntegerIndeces } = require("../constants/randoms");
const { modeTypes } = require("../constants/modes");
const { randomIntegerFromInterval, randomBit } = require("../random-generators/randomizer");
const { materialize } = require("../mappers/tonal-mapper");

function colorize(progression, tonalChords, mode, shouldApplyDominants) {
    let colorizationIndex = COLORIZATION_RANGE.MAX;
    let colorizedProgression = [];
    colorizedProgression.push(progression[0]);

    //adds up to three applied dominants or mediants skipping first chord in given progression    
    let chord;
    let appliedChord;
    for (let index = 1; index < progression.length; index++) {
        chord = progression[index];

        if (colorizationIndex === COLORIZATION_RANGE.MAX) {
            colorizedProgression.push(chord);
            continue;
        }

        //colorizes 4th degree
        if (chord === rootDegrees.SUBDOMINANT) {
            if (shouldApplyDominants) {
                [colorizedProgression, colorizationIndex] = colorizeFourthDegreeWithAppliedDominants(
                    chord, colorizedProgression, colorizationIndex,
                    progression, index, appliedChord
                );
                continue;
            }

            [colorizedProgression, colorizationIndex] = colorizeFourthDegree(
                chord, colorizedProgression, colorizationIndex,
                progression, index, appliedChord
            );
            continue;
        }

        //avoids situations of type 'Gdim, G7, C7, Fm'
        if (mode === modeTypes.MINOR
            && chord === rootDegrees.DOMINANT
            && progression[index - 1] === rootDegrees.SUPERTONIC) {

            colorizedProgression.push(chord);
            continue;
        }

        //colorizes 6th degree
        if (chord === rootDegrees.SUBMEDIANT) {
            if (shouldApplyDominants) {
                [colorizedProgression, colorizationIndex] = colorizeSixthDegreeWithAppliedDominants(
                    chord, colorizedProgression, colorizationIndex,
                    progression, index, appliedChord, mode
                );
                continue;
            }

            [colorizedProgression, colorizationIndex] = colorizeSixthDegree(
                chord, colorizedProgression, colorizationIndex, progression,
                index, shouldApplyDominants, appliedChord, mode
            );
            continue;
        }

        //colorizes chords on other degrees
        if (shouldApplyDominants
            && progression[index] !== rootDegrees.KEY_CENTER
            && randomBit() === randomBitStates.POSITIVE) {

            colorizedProgression.push(chord * APPLIED_DOMINANT_COEFFICIENT);
            colorizationIndex++;
        }
        colorizedProgression.push(chord);
    }

    if (colorizedProgression[colorizedProgression.length - 1] !== rootDegrees.DOMINANT) {
        colorizedProgression = createFinalAuthenticCadence(colorizedProgression);
        //adds final tonic
        colorizedProgression.push(harmonicFunctions.TONIC[0]);
        return materialize(colorizedProgression, tonalChords);
    }
    //turns last dominant from five to seventh chord
    colorizedProgression[colorizedProgression.length - 1] = chordIndeces.DOMINANT_SEVENTH;
    colorizedProgression.push(harmonicFunctions.TONIC[0]);
    return materialize(colorizedProgression, tonalChords);
}

function colorizeFourthDegree(
    chord, colorizedProgression, colorizationIndex, progression,
    index, appliedChord) {

    appliedChord = randomIntegerFromInterval(randomIntegerIndeces.MIN, randomIntegerIndeces.SECONDARY);
    //adds mediant between tonic and subdominant
    if (appliedChord === randomIntegerIndeces.PRIMARY
        && progression[index - 1] === rootDegrees.KEY_CENTER) {

        colorizedProgression.push(rootDegrees.MEDIANT);
        colorizationIndex++;
    }
    colorizedProgression.push(chord);
    return [colorizedProgression, colorizationIndex];
}

function colorizeFourthDegreeWithAppliedDominants(
    chord, colorizedProgression, colorizationIndex, progression,
    index, appliedChord) {

    appliedChord = randomIntegerFromInterval(randomIntegerIndeces.MIN, randomIntegerIndeces.MAX);
    //adds applied dominant 7th
    if (appliedChord === randomIntegerIndeces.PRIMARY) {
        colorizedProgression.push(chordIndeces.ALTERED_TONIC);
        colorizationIndex++;
    }
    //adds mediant between tonic and subdominant
    else if (appliedChord === randomIntegerIndeces.SECONDARY
        && progression[index - 1] === rootDegrees.KEY_CENTER) {

        colorizedProgression.push(rootDegrees.MEDIANT);
        colorizationIndex++;
    }
    colorizedProgression.push(chord);
    return [colorizedProgression, colorizationIndex];
}

function colorizeSixthDegree(
    chord, colorizedProgression, colorizationIndex,
    progression, index, appliedChord, mode) {

    appliedChord = randomIntegerFromInterval(randomIntegerIndeces.MIN, randomIntegerIndeces.MAX);
    //adds mediant chord
    if (appliedChord === randomIntegerIndeces.PRIMARY) {
        colorizedProgression.push(rootDegrees.MEDIANT);
        colorizationIndex++;
    }
    //adds ii-v transition after tonic
    else if (mode === modeTypes.MINOR
        && appliedChord === randomIntegerIndeces.SECONDARY
        && progression[index - 1] === rootDegrees.KEY_CENTER) {

        colorizedProgression.push(rootDegrees.SUBTONIC);
        colorizedProgression.push(rootDegrees.MEDIANT);
        colorizationIndex++;
    }
    colorizedProgression.push(chord);
    return [colorizedProgression, colorizationIndex];
}

function colorizeSixthDegreeWithAppliedDominants(
    chord, colorizedProgression, colorizationIndex,
    progression, index, appliedChord, mode) {

    appliedChord = randomIntegerFromInterval(
        randomIntegerIndeces.MIN, randomIntegerIndeces.RANGE_UPPER_BOUND);
    //adds applied dominant 7th
    if (appliedChord === randomIntegerIndeces.PRIMARY) {
        colorizedProgression.push(chordIndeces.ALTERED_MEDIANT);
        colorizationIndex++;
    }
    //adds mediant chord
    else if (appliedChord === randomIntegerIndeces.SECONDARY) {
        colorizedProgression.push(rootDegrees.MEDIANT);
        colorizationIndex++;
    }
    //adds ii-v transition after tonic
    else if (appliedChord === randomIntegerIndeces.MAX
        && progression[index - 1] === rootDegrees.KEY_CENTER) {

        colorizedProgression.push(rootDegrees.SUBTONIC);
        if (mode === modeTypes.MAJOR) {
            colorizedProgression.push(chordIndeces.ALTERED_MEDIANT)
        } else {
            colorizedProgression.push(rootDegrees.MEDIANT);
        }
        colorizationIndex++;
    }

    colorizedProgression.push(chord);
    return [colorizedProgression, colorizationIndex];
}

function createFinalAuthenticCadence(colorizedProgression) {
    if (randomBit() === randomBitStates.NEGATIVE
        && colorizedProgression[colorizedProgression.length - 1] !== rootDegrees.KEY_CENTER) {

        //adds double appoggiatura to dominant seventh chord  
        colorizedProgression.push(chordIndeces.CADENTIAL_SIX_FOUR_CHORD);
        colorizedProgression.push(chordIndeces.DOMINANT_SEVENTH);
        return colorizedProgression;
    }
    //adds single leaning tone to dominant five chord     
    colorizedProgression.push(chordIndeces.SUSPENDED_DOMINANT);
    colorizedProgression.push(harmonicFunctions.DOMINANT[0]);
    return colorizedProgression;
}

module.exports = { colorize };