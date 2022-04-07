const pitches = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
let newKey = [];
let counter = 0;
let pitchIndex = 5;

//populates scale degrees
while (counter <= 7) {
    newKey.push(pitches[pitchIndex]);

    if (pitchIndex < pitches.length - 1) {
        pitchIndex++;
    } else {
        pitchIndex = 0;
    }

    counter++;
}

//adds key signature
const sharps = ['F', 'C', 'G', 'D', 'A', 'E', 'B'];
const majorCircleOfFifts = {
    'C': 0,
    'G': 1,
    'D': 2,
    'A': 3,
    'E': 4,
    'B': 5,
    // 'F': 0,
    // 'C': 0,
}

const sharpCount = circleOfFifts[newKey[0]];//todo
for (let i = 0; i < sharpCount; i++) {
    let degreeIndex = newKey.indexOf(sharps[i]);
    newKey[degreeIndex] += '#';
}

console.log(newKey.join(' '));
