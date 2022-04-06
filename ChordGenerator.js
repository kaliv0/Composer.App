const functions = [
    [8, 6],  //Tonic => main tonic written as 8 instead of 1 for computational reasons
    [4, 2],  //Subdominant
    [7, 5],  //Dominant
];

let progression = [];

let funcIndex = 0;
let chordCounter = 0;

while (true) {
    for (let chord of functions[funcIndex]) {
        //decides to include new chord in progression
        if (Math.round(Math.random()) == 1) {
            //avoids duplicates and reversing functional logic from subsidiary to main chords
            if (progression.length > 0 &&
                (progression[progression.length - 1] === chord || progression[progression.length - 1] === chord - 2)) {
                continue;
            }

            if (progression.length >= 2 && progression[progression.length - 2] === chord) {
                continue;
            }

            progression.push(chord);
            chordCounter++;
        }
    }

    //checks total length of progression and decides to continue or not
    if (chordCounter >= 8) {
        if (Math.round(Math.random()) === 0) {
            break;
        }
    }

    if (chordCounter === 24) {
        break;
    }

    //decides to go to next chord function or skip one
    funcIndex += Math.round(Math.random() + 1);
    if (funcIndex >= functions.length) {
        funcIndex = 0;
    }
}

//maps progression to chords in particular key
//could be modified to any major or minor tonality
const tonalChords = {
    //A minor
    [8] : "Am",
    [2] : "Bdim",
    [3] : "C",
    [4] : "Dm",
    [5] : "E7",
    [6] : "F",
    [7] : "G",

    //F minor
    // [8]: "F min",
    // [2]: "G dim",
    // [3]: "Ab",
    // [4]: "Bb min",
    // [5]: "C7",
    // [6]: "Db",
    // [7]: "Eb",
};

let result = '';

for (let chord of progression) {
    result += `${tonalChords[chord]}, `;
}

//prints progression
console.log(result.toString().trim());
