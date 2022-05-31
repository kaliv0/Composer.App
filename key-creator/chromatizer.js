//appends required chromatic signs for a given key signature
function addChromaticSigns(scale, tonic, mode) {
    const chromaticSigns = ['F', 'C', 'G', 'D', 'A', 'E', 'B'];
    const majorCircleOfFifths = {
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
        //non-existing, added here for computational reasons
        'G#': 8,
        'D#': 9,
        'A#': 10
    }

    let signCount = majorCircleOfFifths[tonic];
    let isWithFlats = (tonic.charAt(1) === 'b' || tonic === 'F');

    if (mode === 'minor') {
        if (isWithFlats) {
            signCount += 3;
        } else {
            signCount -= 3;
        }
    }

    if (signCount > 7) {
        throw new Error("Invalid key");
    }

    if (isWithFlats || signCount < 0) {
        if (signCount < 0) {
            signCount = Math.abs(signCount);
        }
        //adds flats
        for (let i = signCount; i > 0; i--) {
            let currNote = chromaticSigns[chromaticSigns.length - i];
            let degreeIndex = scale.indexOf(currNote);
            scale[degreeIndex] += 'b';
        }
    } else {
        //adds sharps
        for (let i = 0; i < signCount; i++) {
            let degreeIndex = scale.indexOf(chromaticSigns[i]);
            scale[degreeIndex] += '#';
        }
    }
    return scale;
}

module.exports = { addChromaticSigns };
