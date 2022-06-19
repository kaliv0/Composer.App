const { accidentals } = require("../constants/chromaticSigns");

function raiseNote(note) {
    if (note.includes(accidentals.SHARP)) {
        note = note[0] + accidentals.DOUBLE_SHARP;
    }
    else if (note.includes(accidentals.FLAT)) {
        note = note[0];
    }
    else {
        note = note + accidentals.SHARP;
    }

    return note;
}

function lowerNote(note) {
    if (note.includes(accidentals.SHARP)) {
        note = note[0];
    } else {
        note = note + accidentals.FLAT;
    }

    return note;
}

module.exports = { raiseNote, lowerNote };