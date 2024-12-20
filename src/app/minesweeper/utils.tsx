export const NB_MINES: number = 10;
export const GRID_WIDTH: number = 9;
export const GRID_HEIGHT: number = 9;

export type Case = {
  value: number;
  state: "hidden" | "revealed" | "marked";
};

const nbCases = GRID_HEIGHT * GRID_WIDTH;

export const initGrid = (setGrid: Case[]) => {
  // add mines in the grid (value=9)
  const tabMines: number[] = generateUniqueRandomNumbers(NB_MINES, nbCases - 1);
  const updatedGrid = Array(GRID_HEIGHT * GRID_WIDTH).fill({
    value: 0,
    state: "hidden",
  });
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
};

export const revealAdjacentCase0 = (grid: Case[], index: number) => {
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
  for (const [dx, dy] of directions) {
    const XIndex = Math.floor(index / 9);
    const YIndex = index % 9;
    const x = XIndex + dx;
    const y = YIndex + dy;
    if (
      x >= 0 &&
      x < 9 &&
      y >= 0 &&
      y < 9 &&
      grid[x * 9 + y].state !== "revealed"
    ) {
      grid[x * 9 + y] = { value: grid[x * 9 + y].value, state: "revealed" };
      if (grid[x * 9 + y].value === 0) {
        revealAdjacentCase0(grid, x * 9 + y);
      }
    }
  }
};

export const nbMarkedMines = (grid: Case[]) => {
  let count = 0;
  for (const cell of grid) {
    if (cell.state === "marked") count++;
  }
  return count;
};

export const isWin = (grid: Case[]) => {
  let win = true;
  for (const cell of grid) {
    if (cell.value !== 9 && cell.state !== "revealed") {
      win = false;
    }
  }
  return win;
};

export const isLoose = (grid: Case[]) => {
  let loose = false;
  for (const cell of grid) {
    if (cell.value === 9 && cell.state === "revealed") {
      loose = true;
    }
  }
  return loose;
};
