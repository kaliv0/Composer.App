# Composer.App

A simple console application written in javaScript that generates a chord progression in a given key.
The progession could be used for imporvisation and educational purposes.

Composer.App supports the following functionalities:
- random-key-selector.js => chooses a random key to be constructed
- key-generator.js => creates the main scale of the given key
- chromatizer.js => appends the required chromatic signs for the chosen key signature
- chord-generator.js => generates all main chords in the tonality with their applied dominants
- generateProgression.js => creates simple chord progression in the chosen key applying the traditional laws of tonal harmony
- colorizer.js => inserts applied dominants, ii-v 'movements' and appends final cadence
- randomizer.js => helper function for random selection of integers used throughout the application
- app.js => main starting point to get the application running
