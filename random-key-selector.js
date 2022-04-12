function selectKey() {
    const pitches = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    //chooses random key
    function randomIntFromInterval(min, max) { //max excluded 
        return Math.floor(Math.random() * (max - min) + min);
    }

    const rndInt = randomIntFromInterval(0, 7);

    const key = pitches[rndInt];
    const mode = (Math.round(Math.random()) === 0) ? 'major' : 'minor';
    return [key, mode];
}

module.exports = { selectKey };