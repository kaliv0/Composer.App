/*
TODO:
- colorization with applied subdominant and dominant => only one
- colorization with dominant should be 1 or 2?
- add phrase boundaries
- add sequences
- add modal interchange (Neapolitan chord)
*/
const keySelector = require("./random-key-selector");
const keyGenerator = require("./key-generator");
const chordGenerator = require("./chord-generator");

function generateProgression(tonalChords) {
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
            if (Math.round(Math.random()) == 1) {
                //avoids duplicates
                if (progression.length > 0 &&           //avoids putting main chord after subsidiary one e.g. F after D min
                    (progression[progression.length - 1] === chord || progression[progression.length - 1] === chord - 2)) {
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
            if (Math.round(Math.random()) === 0) {
                break;
            }
        }
        if (progression.length === 16) {
            break;
        }
        //decides to go to next chord function or skip one
        funcIndex += Math.round(Math.random() + 1);
        if (funcIndex >= functions.length) {
            funcIndex = 0;
        }
    }

    let colorizationIndex = 0;
    let colorizedProgression = [];
    colorizedProgression.push(progression[0]);

    //adds up to two applied dominants
    progression.forEach((chord, index) => {
        if (index === 0) {
            return;
        }
        if (colorizationIndex < 2 && chord !== 8 && Math.round(Math.random()) === 1) {
            colorizedProgression.push(chord * 10);
            colorizationIndex++;
        }
        colorizedProgression.push(chord);
    });

    //creates final authentic cadence
    if (colorizedProgression[colorizedProgression.length - 1] !== 5) {
        if (Math.round(Math.random()) === 0 && colorizedProgression[colorizedProgression.length - 1] !== 8) {
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

    result = result.substring(0, result.length - 2);
    return result.toString();
}


const [randomKey, randomMode] = keySelector.selectKey();
//todo => what if app chooses invalid key?
const scale = keyGenerator.generateKey(`${randomKey} ${randomMode}`);
const chords = chordGenerator.generateChords(scale, randomMode);
console.log(generateProgression(chords));
