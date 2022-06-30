//creates simple chord progression in randomly chosen key
//applying traditional laws of tonal harmony

/*
features that could be added:
- add phrase boundaries
- add sequences
- add modal interchange (Neapolitan chord)
*/
const { harmonicFunctions, progressionLength } = require("../constants/chords");
const { randomBit } = require("../random-generators/randomizer");
const { colorize } = require("./colorizer");

function generateProgression(tonalChords, mode, shouldApplyDominants) {
    let progression = [];
    let funcIndex = 0;
    let functionValues = Object.values(harmonicFunctions);

    while (true) {
        for (let chord of functionValues[funcIndex]) {
            //decides to include new chord in progression
            if (randomBit() === 1) {
                //avoids duplicates
                if (progression.length > 0 &&
                    (progression[progression.length - 1] === chord
                        //avoids putting main chord after subsidiary one e.g. F after D min
                        || progression[progression.length - 1] === chord - 2)) {
                    continue;
                }
                //avoids duplicates at penultimate index
                if (progression.length >= 2 && progression[progression.length - 2] === chord) {
                    continue;
                }
                progression.push(chord);
            }
        }
        //checks total length of progression and decides to continue or not
        if ((progression.length >= progressionLength.MIN && randomBit() === 0)
            || progression.length === progressionLength.MAX) {
            break;
        }
        //decides to go to next chord function or skip one
        funcIndex += (randomBit() + 1);
        if (funcIndex >= functionValues.length) {
            funcIndex = 0;
        }
    }
    return colorize(progression, tonalChords, mode, shouldApplyDominants);
}

module.exports = { generateProgression };