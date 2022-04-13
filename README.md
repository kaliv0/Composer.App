# Composer.App

A simple console application written in *JavaScript* that generates a chord progression in a given key.
The progession could be used for imporvisation and educational purposes.

Composer.App supports the following functionalities:
- *_random-key-selector.js_* => chooses a random key to be constructed
- *_key-generator.js_* => creates the main scale of the given key
- *_chromatizer.js_* => appends the required chromatic signs for the chosen key signature
- *_chord-generator.js_* => generates all main chords in the tonality with their applied dominants
- *_generateProgression.js_* => creates simple chord progression in the chosen key applying the traditional laws of tonal harmony
- *_colorizer.js_* => inserts applied dominants, ii-v 'movements' and appends final cadence
- *_randomizer.js_* => helper function for random selection of integers used throughout the application
- *_app.js_* => main starting point to get the application running
