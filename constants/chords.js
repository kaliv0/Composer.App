const MINOR_CHORD_DEGREE_INDECES = [1, 2, 5];
const chordIndeces = {
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
}

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
    'SLASH_CHORD': '/'
}

const progressionLength = {
    'MIN': 8,
    'MAX': 16,
}

module.exports = {
    chordIndeces,
    MINOR_CHORD_DEGREE_INDECES,
    chordToneIndexes,
    harmonicFunctions,
    chordSuffixes,
    progressionLength
};
