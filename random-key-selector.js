function selectKey() {
    const pitches = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
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

    const mode = (Math.round(Math.random()) === 0) ? 'major' : 'minor';
    return [key, mode];
}

module.exports = { selectKey };