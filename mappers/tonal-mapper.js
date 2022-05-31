//maps progression to chords in particular key
//could be modified to any major or minor tonality
function materialize(progression, tonalChords) {
    let result = progression.reduce((acc, val) => {
        return acc += `${tonalChords[val]}, `;
    }, '');
    
    return result.substring(0, result.length - 2);
}

module.exports = { materialize };