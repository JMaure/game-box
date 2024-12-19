export const NB_MINES: number = 10;
export const GRID_WIDTH: number = 9;
export const GRID_HEIGHT: number = 9;

export type Case = {
  value: number;
  state: "hidden" | "revealed" | "marked";
};

const nbCases = GRID_HEIGHT * GRID_WIDTH;

export const initGrid = (grid: Case[], setGrid: Case[]) => {
  // add mines in the grid (value=9)
  const tabMines: number[] = generateUniqueRandomNumbers(NB_MINES, nbCases - 1);
  const updatedGrid = [...grid];
  tabMines.forEach((element) => {
    updatedGrid[element] = { value: 9, state: "hidden" };
  });
  // calculate values of others case
  initValues(updatedGrid);

  setGrid(updatedGrid);
};

const generateUniqueRandomNumbers = (count: number, max: number): number[] => {
  const numbers: number[] = [];
  while (numbers.length < count) {
    const randomNum = Math.floor(Math.random() * (max + 1));
    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum);
    }
  }
  return numbers;
};

const initValues = (grid: Case[]) => {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i * 9 + j].value !== 9) {
        let count = 0;
        for (const [dx, dy] of directions) {
          const x = i + dx;
          const y = j + dy;
          if (
            x >= 0 &&
            x < 9 &&
            y >= 0 &&
            y < 9 &&
            grid[x * 9 + y].value === 9
          ) {
            count++;
          }
        }
        grid[i * 9 + j] = { value: count, state: "hidden" };
      }
    }
  }
  //return grid;
};
