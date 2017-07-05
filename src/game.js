'use strict';

const cloneDeep = require('lodash.clonedeep');

function isAlive(neighbours) {
  if (neighbours === 2 || neighbours === 3) return 1;

  return 0;
}

function isDead(neighbours) {
  if (neighbours === 3) return 1;

  return 0;
}

module.exports.processCell = (cell, neighbours) => {
  if (cell === 1) return isAlive(neighbours);
  if (cell === 0) return isDead(neighbours);
};

module.exports.countNeighbours = (seed, rowIndex, cellIndex) => {
  let neighbours = 0;

  if (seed[rowIndex - 1] !== undefined) { // to check it is in bounds (as 0 is falsy)
    if (seed[rowIndex - 1][cellIndex - 1] !== undefined) neighbours += (seed[rowIndex - 1][cellIndex - 1]);
    if (seed[rowIndex - 1][cellIndex] !== undefined) neighbours += (seed[rowIndex - 1][cellIndex]);
    if (seed[rowIndex - 1][cellIndex + 1] !== undefined) neighbours += (seed[rowIndex - 1][cellIndex + 1]);
  }

  if (seed[rowIndex + 1] !== undefined) {
    if (seed[rowIndex + 1][cellIndex - 1] !== undefined) neighbours += (seed[rowIndex + 1][cellIndex - 1]);
    if (seed[rowIndex + 1][cellIndex] !== undefined) neighbours += (seed[rowIndex + 1][cellIndex]);
    if (seed[rowIndex + 1][cellIndex + 1] !== undefined) neighbours += (seed[rowIndex + 1][cellIndex + 1]);

  }

  if (seed[rowIndex][cellIndex - 1] !== undefined) neighbours += (seed[rowIndex][cellIndex - 1]);
  if (seed[rowIndex][cellIndex + 1] !== undefined) neighbours += (seed[rowIndex][cellIndex + 1]);

  return neighbours;
};

module.exports.renderNextGrid = (grid) => {
  const newGrid = cloneDeep(grid);

  grid.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      const neighbours = module.exports.countNeighbours(grid, rowIndex, cellIndex);
      const newCell = module.exports.processCell(grid[rowIndex][cellIndex], neighbours);

      newGrid[rowIndex][cellIndex] = newCell;
    });
  });

  return newGrid;
};

module.exports.printGrid = (grid) => {
  const output = grid.map((row, rowIndex) => {
    const cells = row.map((item, itemIndex) => {
      if (grid[rowIndex][itemIndex] === 1) {
        return '🐸 ';
      }
      return '🐨 ';
    });
    return cells;
  });

  console.log('\x1Bc');
  console.log(output);
};
