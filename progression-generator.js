/*
TODO:
- add phrase boundaries
- add sequences
- add modal interchange (Neapolitan chord)
*/
const keySelector = require("./helpers/random-key-selector");
const keyGenerator = require("./helpers/key-generator");
const chordGenerator = require("./helpers/chord-generator");
const randomizer = require("./helpers/randomizer");
const colorizer = require("./helpers/colorizer");

function generateProgression(tonalChords, mode) {
    const functions = [
        [8, 6],  //Tonic => main tonic written as 8 instead of 1 for computational reasons   
        [4, 2],  //Subdominant    
        [5]      //Dominant  
    ];

    const finalCadence = [100, 90, 80] //final cadence

    let progression = [];
    let funcIndex = 0;

    while (true) {
        for (let chord of functions[funcIndex]) {
            //decides to include new chord in progression
            if (randomizer.randomBit() === 1) {
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
        if (progression.length >= 8) {
            if (randomizer.randomBit() === 0) {
                break;
            }
        }
        if (progression.length === 16) {
            break;
        }
        //decides to go to next chord function or skip one
        funcIndex += (randomizer.randomBit() + 1);
        if (funcIndex >= functions.length) {
            funcIndex = 0;
        }
    }

    const result = colorizer.colorize(progression, tonalChords, mode);
    return result.toString();
}

const [key, mode] = keySelector.selectKey();
const scale = keyGenerator.generateKey(`${key} ${mode}`);
const chords = chordGenerator.generateChords(scale, mode);
console.log(generateProgression(chords, mode));
