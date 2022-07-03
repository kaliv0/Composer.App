const SIGN_INCREMENTAL_STEP = 3;
const chromaticSigns = ['F', 'C', 'G', 'D', 'A', 'E', 'B'];
const accidentals = {
    "SHARP": "#",
    "DOUBLE_SHARP": "x",
    "FLAT": "b",
};

const chromaticSignCount = {
    'MIN': 0,
    'MAX': 7,
};

module.exports = { SIGN_INCREMENTAL_STEP, chromaticSigns, accidentals, chromaticSignCount };