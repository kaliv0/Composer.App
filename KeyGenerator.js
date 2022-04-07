function generateKey(tonality) {
    const pitches = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const [tonic, mode] = tonality.split(' ');
    let newKey = [];
    let counter = 0;
    let firstDegree = tonic.charAt(0);
    let pitchIndex = pitches.indexOf(firstDegree);

    //populates scale degrees
    while (counter < 7) {
        newKey.push(pitches[pitchIndex]);

        if (pitchIndex < pitches.length - 1) {
            pitchIndex++;
        } else {
            pitchIndex = 0;
        }

        counter++;
    }

    //todo => how we decide if it has sharps or flats?
    newKey = addSharps(newKey);
    console.log(newKey.join(' '));

    //helper function => adds key signature
    function addSharps(scale) {

        const sharps = ['F', 'C', 'G', 'D', 'A', 'E', 'B'];
        const majorCircleOfFifts = {
            'C': 0,
            'G': 1,
            'D': 2,
            'A': 3,
            'E': 4,
            'B': 5,
            'F#': 6,
            'C#': 7,
        }

        let sharpCount = majorCircleOfFifts[tonic];

        if (mode === 'minor') {
            sharpCount -= 3;
        }

        for (let i = 0; i < sharpCount; i++) {
            let degreeIndex = newKey.indexOf(sharps[i]);
            newKey[degreeIndex] += '#';
        }

        return scale;
    }
}

generateKey('B major')