//starts application

const keySelector = require("./random/random-key-selector");
const keyGenerator = require("./key-creator/key-generator");
const chordGenerator = require("./key-creator/chord-generator");
const progressionGenerator = require("./harmony-creator/progression-generator");

const [key, mode] = keySelector.selectKey();
const scale = keyGenerator.generateKey(`${key} ${mode}`);
const chords = chordGenerator.generateChords(scale, mode);
console.log(progressionGenerator.generateProgression(chords, mode));