# Composer.App

A simple console application written in *JavaScript* that generates a chord progression in a given musical key.
The progession could be used for improvisation and educational purposes.

Composer.App supports the following functionalities:
- *_random-key-selector.js_* => chooses a random key to be constructed
- *_key-generator.js_* => creates the main scale of the given key
- *_chromatizer.js_* => appends the required chromatic signs for the chosen key signature
- *_chord-generator.js_* => generates all main chords in the tonality with their applied dominants
- *_progression-generator.js_* => creates simple chord progression in the chosen key applying the traditional laws of tonal harmony
- *_colorizer.js_* => inserts applied dominants, ii-v 'movements' and appends final cadence
- *_tonal-mapper.js_* => maps progression to chords in particular key
- *_chord-mapper.js_* => maps chord abbreviations to full representation of the chords
- *_dominant-mapper.js_* => reads dominant seventh chords and modifies them where necessary
- *_note-alterator.js_* => contains helper functions for adding accidentals
- *_randomizer.js_* => helper function for random selection of integers used throughout the application
- *_app.js_* => main entry point of the application