//maps progression to chords in particular key
//could be modified to any major or minor tonality
function materialize(progression, tonalChords) {
    return progression.reduce((materializedProgression, chordIndex) => {
        materializedProgression.push(tonalChords[chordIndex]);
        return materializedProgression;
    }, []);
}

module.exports = { materialize };