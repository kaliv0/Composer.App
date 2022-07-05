const MINOR_CHORD_DEGREE_INDECES = [1, 2, 5];
const APPLIED_DOMINANT_COEFFICIENT = 10;
const CHORD_DECREMENTER = 2;
const chordIndeces = {
    'ALTERED_SUBMEDIANT': 20,
    'ALTERED_TONIC': 40,
    'ALTERED_MEDIANT': 60,
    'DOMINANT_SEVENTH': 80,
    'SUSPENDED_DOMINANT': 90,
    'CADENTIAL_SIX_FOUR_CHORD': 100,
};

const chordToneIndexes = {
    'ROOT': 0,
    'THIRD': 1,
    'FIFTH': 2,
    'SEVENTH': 3,
    'TRIAD_NOTE_COUNT': 3,
    'DOMINANT_NOTE_COUNT': 4,
};

const rootDegrees = {
    'TONIC': 1,
    'SUPERTONIC': 2,
    'MEDIANT': 3,
    'SUBDOMINANT': 4,
    'DOMINANT': 5,
    'SUBMEDIANT': 6,
    'SUBTONIC': 7,
    'KEY_CENTER': 8
};

const harmonicFunctions = {
    //main tonic written as 8 instead of 1 for computational reasons 
    'TONIC': [8, 6],
    'SUBDOMINANT': [4, 2],
    'DOMINANT': [5],
};

const chordSuffixes = {
    'MAJOR': 'maj',
    'MINOR': 'm',
    'DIMINISHED': 'dim',
    'SEVENTH': '7',
    'SUSPENDED': 'sus',
    'SLASH_CHORD': '/',
};

const PROGRESSION_LENGTH = {
    'DUPLICATE_THRESHOLD': 2,
    'MIN': 8,
    'MAX': 16,
};

const COLORIZATION_RANGE = {
    'MIN': 0,
    'MAX': 4,
}

module.exports = {
    MINOR_CHORD_DEGREE_INDECES,
    APPLIED_DOMINANT_COEFFICIENT,
    CHORD_DECREMENTER,
    COLORIZATION_RANGE,
    chordIndeces,
    chordToneIndexes,
    chordSuffixes,
    rootDegrees,
    harmonicFunctions,
    PROGRESSION_LENGTH
};
