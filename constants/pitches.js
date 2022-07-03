const SCALE_PITCHES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
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
};

module.exports = { SCALE_PITCHES, majorCircleOfFifths };