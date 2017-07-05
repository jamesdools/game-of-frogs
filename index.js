'use strict';

const game = require('./src/game');
const seeds = require('./src/seeds');

function loop(grid) {
  game.printGrid(grid);

  const nextGrid = game.renderNextGrid(grid);

  setTimeout(() => {
    loop(nextGrid);
  }, 250);
}

loop(seeds.smallExploder);
