# Petri Dish

[Play the live version on my website!][germs]
[germs]: http://www.jshorty.com/germs

## About
Petri Dish borrows concepts from the Asteroids arcade game, but at a scale many orders of magnitude smaller. The player floats and fights to survive while surrounded by his slightly larger, albeit microscopic neighbors.

## Features
- JavaScript game logic rendered through HTML5 canvas
- Germs split up and speed up when hit by the player's bullets
- Difficulty increases over time
- Temporary immunity on player respawn
- uses [Keymaster][keymaster] library
[keymaster]: https://github.com/madrobby/keymaster

## Next Step Goals
- [X] Realistic bullet speed/direction (use player movement vectors)
- [X] Respawning enemies
- [X] Player has limited lives, Game Over screen displayed when finished
- [X] Add timer, time-based scoring
- [X] Germs split into two smaller ones when shot (currently they just shrink or disappear)
- [ ] Integrate start/game-over UI into in-game JavaScript
