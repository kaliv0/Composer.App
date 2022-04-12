const chromatizator = require("./chromatizator");

function generateKey(tonality) {
    //regexp for valid keys 
    const validKey = /^[A-G][#b]?\s(\bminor\b)?(\bmajor\b)?$/;
    if (!validKey.test(tonality)) {
        console.error('Invalid key');
        return;
    }

    const pitches = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    const [tonic, mode] = tonality.split(' ');
    let pitchIndex = pitches.indexOf(tonic.charAt(0));

    //populates scale degrees
    let counter = 0;
    let newKey = [];
    while (counter < 7) {
        newKey.push(pitches[pitchIndex]);

        if (pitchIndex < pitches.length - 1) {
            pitchIndex++;
        } else {
            pitchIndex = 0;
        }
        counter++;
    }

    //error handling needed if user selects key manually
    try {
        newKey = chromatizator.addChromaticSigns(newKey, tonic, mode);
        return newKey;
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = { generateKey };
