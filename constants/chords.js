/* TODO => refactor finalCadence to object */
const finalCadence = [100, 90, 80];
const harmonicFunctions = {
    'TONIC': [8, 6],  //main tonic written as 8 instead of 1 for computational reasons   
    'SUBDOMINANT': [4, 2],
    'DOMINANT': [5]
};

const chordSuffixes = {
    'MAJOR': 'maj',
    'MINOR': 'm',
    'DIMINISHED': 'dim',
    'SEVENTH': '7',
    'SUSPENDED': 'sus',
    'MINOR_INDECES': [1, 2, 5]
}

module.exports = { finalCadence, harmonicFunctions, chordSuffixes };
