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

//
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

        if (chord.slice(-1) === '7') {
            notesCount = 4;
        } else {
            notesCount = 3;
        }

        fullChord = [];
        let scaleIndex = sc.indexOf(curr);
        for (let j = 0; j < notesCount; j++) {
            fullChord.push(sc[scaleIndex]);
            scaleIndex += 2;

            if (scaleIndex >= 7) {
                scaleIndex -= 7;
            }
        }

        //could be done after the loop?!
        if (chord.includes('sus')) {
            let middleIndx = sc.indexOf(fullChord[1]);
            middleIndx++;
            if (middleIndx >= 7) {
                middleIndx -= 7;
            }
            fullChord[1] = sc[middleIndx];
        }

        roots.push({
            [chord]: fullChord
        });
    });

    return roots;
}

















//
