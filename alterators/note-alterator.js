const { accidentals } = require("../constants/chromaticSigns");

function raiseNote(note) {
    if (note.includes(accidentals.SHARP)) {
        return note[0] + accidentals.DOUBLE_SHARP;
    }
    else if (note.includes(accidentals.FLAT)) {
        return note[0];
    }
    return note + accidentals.SHARP;
}

function lowerNote(note) {
    if (note.includes(accidentals.SHARP)) {
        return note[0];
    }
    return note + accidentals.FLAT;
}

module.exports = { raiseNote, lowerNote };