'use strict';

const assert = require('assert');
const game = require('../src/game');
const seeds = require('../src/seeds');

describe('Game of life mechanics', () => {
  it('counts the correct number of neighbours', () => {
    const input = [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1]
    ];

    const topLeftCell = game.countNeighbours(input, 0, 0);
    const middleCell = game.countNeighbours(input, 1, 1);

    assert.equal(topLeftCell, 2);
    assert.equal(middleCell, 8);
  });

  it('alive cell dies when it has less than 2 or more than 3 neighbours', () => {
    const newCell1 = game.processCell(1, 1);
    const newCell2 = game.processCell(1, 4);

    assert.equal(newCell1, 0);
    assert.equal(newCell2, 0);
  });

  it('alive cell persists when it has 2 or 3 neighbours', () => {
    const newCell1 = game.processCell(1, 2);
    const newCell2 = game.processCell(1, 3);

    assert.equal(newCell1, 1);
    assert.equal(newCell2, 1);
  });

  it('dead cell revives when it has exactly 3 neighbours', () => {
    const newCell = game.processCell(0, 3);

    assert.equal(newCell, 1);
  });

  it('renders correct movement of glider', () => {
    const input = seeds.glider;
    const expectedFirstIteration = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    const expectedSecondIteration = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    const firstIteration = game.renderNextGrid(input);
    const secondIteration = game.renderNextGrid(firstIteration);

    assert.deepEqual(firstIteration, expectedFirstIteration);
    assert.deepEqual(secondIteration, expectedSecondIteration);
  });
});
