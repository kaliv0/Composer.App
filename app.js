//starts application
const keySelector = require("./random-generators/random-key-selector");
const colorizeSelector = require("./random-generators/randomizer");
const keyGenerator = require("./key-creator/key-generator");
const chordGenerator = require("./key-creator/chord-generator");
const progressionGenerator = require("./harmony-creator/progression-generator");

// const [key, mode] = keySelector.selectKey();
const key = 'F';
const mode = 'major';
// const shouldApplyDominants = colorizeSelector.randomBit();
const shouldApplyDominants = 1;

const scale = keyGenerator.generateKey(`${key} ${mode}`);
const chords = chordGenerator.generateChords(scale, mode);
const progression = progressionGenerator.generateProgression(chords, mode, shouldApplyDominants);
console.log(progression);

const res = translate(progression, scale);

for (x of res) {
    console.log(JSON.stringify(x));
}

/*TODO:
    handle K64 chords,
    add accidentals to applied dominant chords
*/
function translate(prog, sc) {

    let roots = [];
    let curr;
    let signChar;
    let fullChord;
    let notesCount;

    prog.forEach(chord => {
        signChar = chord.charAt(1);
        if (signChar === '#' || signChar === 'b') {
            curr = chord.substring(0, 2);
        } else if (signChar === '/') {
            curr = chord.substring(2);
        } else {
            curr = chord.charAt(0);
        }

        notesCount = chord.slice(-1) === '7' ? 4 : 3;

        fullChord = [];
        let scaleIndex = sc.indexOf(curr);
        for (let j = 0; j < notesCount; j++) {
            fullChord.push(sc[scaleIndex]);
            
            //to be optimized
            scaleIndex += 2;
            if (scaleIndex >= 7) {
                scaleIndex -= 7;
            }
        }
        roots.push({
            Name: chord,
            Content: fullChord,
        });
    });

    if (roots.some(ch => ch.Name.includes('sus'))) {
        //there is only one suspended chord in the progression
        let susIndex = roots.findIndex(ch => ch.Name.includes('sus'));

        let middleIndx = sc.indexOf(roots[susIndex].Content[1]);

        //to be optimized
        middleIndx++;
        if (middleIndx >= 7) {
            middleIndx -= 7;
        }
        roots[susIndex].Content[1] = sc[middleIndx];
    }

    return roots;
}

















//
