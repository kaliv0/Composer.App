//creates simple chord progression in randomly chosen key
//applying traditional laws of tonal harmony

/*
features that could be added:
- add phrase boundaries
- add sequences
- add modal interchange (Neapolitan chord)
*/
const { harmonicFunctions, PROGRESSION_LENGTH, CHORD_DECREMENTER } = require("../constants/chords");
const { randomBitStates, RANDOM_BIT_INCREMENTER } = require("../constants/randoms");
const { randomBit } = require("../random-generators/randomizer");
const { colorize } = require("./colorizer");

function generateProgression(tonalChords, mode, shouldApplyDominants) {
    let progression = [];
    let funcIndex = 0;
    let functionValues = Object.values(harmonicFunctions);

    while (true) {
        for (let chord of functionValues[funcIndex]) {
            //decides to include new chord in progression
            if (randomBit() === randomBitStates.POSITIVE) {
                //avoids duplicates
                if (progression.length > 0 &&
                    (progression[progression.length - 1] === chord
                        //avoids putting main chord after subsidiary one e.g. F after D min
                        || progression[progression.length - 1] === chord - CHORD_DECREMENTER)) {
                    continue;
                }
                //avoids duplicates at penultimate index
                if (progression.length >= PROGRESSION_LENGTH.DUPLICATE_THRESHOLD
                    && progression[progression.length - 2] === chord) {
                    continue;
                }
                progression.push(chord);
            }
        }
        //checks total length of progression and decides to continue or not
        if ((progression.length >= PROGRESSION_LENGTH.MIN && randomBit() === randomBitStates.NEGATIVE)
            || progression.length === PROGRESSION_LENGTH.MAX) {
            break;
        }
        //decides to go to next chord function or skip one
        funcIndex += (randomBit() + RANDOM_BIT_INCREMENTER);
        if (funcIndex >= functionValues.length) {
            funcIndex = 0;
        }
    }
    return colorize(progression, tonalChords, mode, shouldApplyDominants);
}

module.exports = { generateProgression };