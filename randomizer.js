function randomIntFromInterval(min, max) { //max excluded 
    return Math.floor(Math.random() * (max - min) + min);
}

function randomBit() {
    return Math.round(Math.random());
}

module.exports = { randomIntFromInterval, randomBit };