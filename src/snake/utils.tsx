export const GRID_WIDTH: number = 20;
export const GRID_HEIGHT: number = 20;

const generateGrid = (snake: number[], food: number): string[] => {
  const grid = Array(GRID_HEIGHT * GRID_WIDTH).fill("");
  snake.forEach((element) => {
    grid[element] = "O";
  });
  grid[snake[0]] = "H";
  grid[food] = "F";
  return grid;
};

const generateFood = (snake: number[], grid: string[]): number => {
  let food = Math.floor(Math.random() * (GRID_HEIGHT * GRID_WIDTH));
  while (snake.includes(food) || grid[food] === "O") {
    food = Math.floor(Math.random() * (GRID_HEIGHT * GRID_WIDTH));
  }
  return food;
};

const moveSnake = (snake: number[], direction: string): number[] => {
  const newSnake = [...snake];
  const head = newSnake[0];
  let newHead = 0;
  switch (direction) {
    case "UP":
      newHead = head - GRID_WIDTH;
      break;
    case "DOWN":
      newHead = head + GRID_WIDTH;
      break;
    case "LEFT":
      newHead = head - 1;
      break;
    case "RIGHT":
      newHead = head + 1;
      break;
  }
  newSnake.unshift(newHead);
  newSnake.pop();
  return newSnake;
};

const isSnakeEatFood = (snake: number[], food: number): boolean => {
  return snake[0] === food;
};

const isSnakeEatItself = (snake: number[]): boolean => {
  return snake.slice(1).includes(snake[0]);
};

const isSnakeOutOfGrid = (snake: number[], direction: string): boolean => {
  if (snake[0] % GRID_WIDTH === 0 && direction === "LEFT") {
    return true;
  }
  if (snake[0] % GRID_WIDTH === GRID_WIDTH - 1 && direction === "RIGHT") {
    return true;
  }
  if (snake[0] < GRID_WIDTH && direction === "UP") {
    return true;
  }
  if (
    snake[0] >= GRID_HEIGHT * GRID_WIDTH - GRID_WIDTH &&
    direction === "DOWN"
  ) {
    return true;
  }
  return false;
};

const isSnakeWin = (snake: number[]): boolean => {
  return snake.length === GRID_HEIGHT * GRID_WIDTH;
};

export {
  generateGrid,
  generateFood,
  moveSnake,
  isSnakeEatFood,
  isSnakeEatItself,
  isSnakeOutOfGrid,
  isSnakeWin,
};
