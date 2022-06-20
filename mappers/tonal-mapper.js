//maps progression to chords in particular key
//could be modified to any major or minor tonality
function materialize(progression, tonalChords) {
    return progression.reduce((acc, val) => {
        acc.push(tonalChords[val]);
        return acc;
    }, []);
}

module.exports = { materialize };