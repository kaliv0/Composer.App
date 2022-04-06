const functions = [
    [8, 6], //Tonic => main tonic written as 8 instead of 1 for computational reasons
    [8, 60],
    [4, 2], //Subdominant
    [40, 20],
    [5, 50], //Dominant  
];

let progression = [];

let funcIndex = 0;
let chordCounter = 0;

while (true) {
    for (let chord of functions[funcIndex]) {
        //decides to include new chord in progression
        if (Math.round(Math.random()) == 1) {
            //avoids duplicates
            if (progression.length > 0 && //avoids C after Am
                (progression[progression.length - 1] === chord || progression[progression.length - 1] === chord - 2)) {
                continue;
            }

            if (progression.length > 0 && //avoids C7 F after F and vice versa
                (progression[progression.length - 1] === chord / 10 || progression[progression.length - 1] === chord * 10)) {
                continue;
            }

            if (progression.length > 0 && //avoids C7 F after Dm???,  F after A7 Dm
                (progression[progression.length - 1] === (chord / 10) - 2 || progression[progression.length - 1] / 10 === (chord - 2))) {
                continue;
            }

            //avoids duplicates at penultimate index
            if (progression.length >= 2 && progression[progression.length - 2] === chord) {
                continue;
            }

            //same but with applied dominant chords
            if (progression.length >= 2 &&
                (progression[progression.length - 2] === chord / 10 || progression[progression.length - 2] === chord * 10)) {
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

    if (chordCounter >= 24) {
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
    //C major
    [8]: "C",
    [2]: "Dm",
    //[3]: "Em",
    [4]: "F",
    [5]: "G",
    [6]: "Am",
    //[7]: "Bdim",
    //[80]: "G9 C",
    [20]: "A7, Dm",
    //[30]: "Bdim, Em",
    [40]: "C7, F",
    [50]: "D7, G",
    [60]: "E7, Am",
    //[70]: "F#9 Bdim",


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
