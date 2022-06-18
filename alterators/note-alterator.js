function raiseNote(note) {
    if (note.includes('#')) {
        note = note[0] + 'x';
    }
    else if (note.includes('b')) {
        note = note[0];
    }
    else {
        note = note + '#';
    }

    return note;
}

function lowerNote(note) {
    if (note.includes('#')) {
        note = note[0];
    } else {
        note = note + 'b';
    }

    return note;
}

module.exports = { raiseNote, lowerNote };