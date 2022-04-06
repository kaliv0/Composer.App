const functions = [
    [1, 6], //Tonic chords
    [4, 2], //Subdominant chords
    [7, 5], //Dominant chords
];

let progression = [];

let funcIndex = 0;
let chordCounter = 0;

while (true) {
    for (let chord of functions[funcIndex]) {
        //decides to include new chord in progression
        if (Math.round(Math.random()) == 1) {
            //avoids duplicates
            if (progression.length > 0 && progression[progression.length - 1] == chord) {
                continue;
            }

            if (progression.length >= 2 && progression[progression.length - 2] == chord) {
                continue;
            }

            progression.push(chord);
            chordCounter++;
        }
    }

    //check total length of progression and decide to continue or not
    if (chordCounter >= 8) {
        if (Math.round(Math.random()) == 0) {
            break;
        }
    }

    if (chordCounter == 24) {
        break;
    }

    //decides to go next chord function or skip one
    funcIndex += Math.round(Math.random() + 1);
    if (funcIndex >= functions.length) {
        funcIndex = 0;
    }
}

//maps progression to chords in particular key
//could be modified to any major or minor tonality
var tonalChords = {
    //A minor
    //[1] = "Am",
    //[2] = "Bdim",
    //[3] = "C",
    //[4] = "Dm",
    //[5] = "E7",
    //[6] = "F",
    //[7] = "G",

    //F minor
    [1]: "F min",
    [2]: "G dim",
    [3]: "Ab",
    [4]: "Bb min",
    [5]: "C7",
    [6]: "Db",
    [7]: "Eb",
};

let result = '';

for (let chord of progression) {
    result += `${tonalChords[chord]}, `;
}

//prints progression
console.log(result.toString().trim());
