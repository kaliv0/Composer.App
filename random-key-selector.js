function selectKey() {
    const pitches = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const invalidKeys = [
        'Cb minor',
        'Db minor',
        'D# major',
        'E# major',
        'E# minor',
        'Fb major',
        'Fb minor',
        'Gb minor',
        'G# major',
        'A# major',
        'B# major',
        'B# minor'
    ];

    //chooses random key
    function randomIntFromInterval(min, max) { //max excluded 
        return Math.floor(Math.random() * (max - min) + min);
    }

    const rndIndex = randomIntFromInterval(0, 7);
    let key = pitches[rndIndex];

    const rndInt = randomIntFromInterval(0, 3);
    if (rndInt === 1) {
        key += '#';
    }
    if (rndInt === 2) {
        key += 'b';
    }

    let mode = (Math.round(Math.random()) === 0) ? 'major' : 'minor';

    //checks for invalid key and chooses new one via recursion if necessary
    if (invalidKeys.includes(`${key} ${mode}`)) {
        [key, mode] = selectKey();
    };

    return [key, mode];
}

module.exports = { selectKey };

