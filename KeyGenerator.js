//todo => throw error when non-existing key is entered!
//signCount exceeds 7

function generateKey(tonality) {
    const pitches = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    const [tonic, mode] = tonality.split(' ');
    let pitchIndex = pitches.indexOf(tonic.charAt(0)); //??
    let newKey = [];
    let counter = 0;

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
    
    newKey = addChromaticSigns(newKey);
    console.log(newKey.join(' '));

    //helper function => adds key signature
    function addChromaticSigns(scale) {
        const chromaticSigns = ['F', 'C', 'G', 'D', 'A', 'E', 'B'];
        const majorCircleOfFifts = {
            'C': 0,
            'G': 1,
            'D': 2,
            'A': 3,
            'E': 4,
            'B': 5,
            'F#': 6,
            'C#': 7,
            'Cb': 7,
            'Gb': 6,
            'Db': 5,
            'Ab': 4,
            'Eb': 3,
            'Bb': 2,
            'F': 1,
            //non-existimg, added here for computational reasons
            'G#': 8,
            'D#': 9,
            'A#': 10
        }

        let signCount = majorCircleOfFifts[tonic];

        if (mode === 'minor') {
            if (tonic.charAt(1) === 'b' || tonic === 'F') {
                signCount += 3;
            }
            else {
                signCount -= 3;
            }
        }

        //todo => too verbose?! don't repeat yourself
        if (tonic.charAt(1) === 'b' || tonic === 'F' || signCount < 0) {
            if (signCount < 0) {
                signCount = Math.abs(signCount);
            }

            //ads flats
            for (let i = signCount; i > 0; i--) {
                let currNote = chromaticSigns[chromaticSigns.length - i];
                let degreeIndex = newKey.indexOf(currNote);
                newKey[degreeIndex] += 'b';
            }
        }
        else {
            //adds sharps
            for (let i = 0; i < signCount; i++) {
                let degreeIndex = newKey.indexOf(chromaticSigns[i]);
                newKey[degreeIndex] += '#';
            }
        }

        return scale;
    }
}

generateKey('Db major')