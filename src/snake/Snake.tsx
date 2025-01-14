import { useEffect, useState } from "react";
import {
  generateFood,
  generateGrid,
  GRID_HEIGHT,
  GRID_WIDTH,
  isSnakeEatFood,
  isSnakeEatItself,
  isSnakeOutOfGrid,
  isSnakeWin,
  moveSnake,
} from "./utils";
import { Grid } from "./Grid";

export const Snake = () => {
  const [score, setScore] = useState(0);
  const [snake, setSnake] = useState<Array<number>>([22, 21]);
  const [direction, setDirection] = useState("RIGHT");
  const [food, setFood] = useState(26 /* generateFood(snake, []) */);
  const [grid, setGrid] = useState<Array<string>>(generateGrid(snake, food));

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        isSnakeEatItself(snake) ||
        isSnakeOutOfGrid(snake, direction) ||
        isSnakeWin(snake)
      ) {
        console.log("out of grid");
        clearInterval(interval);
      } else {
        const newSnake = moveSnake(snake, direction);
        if (isSnakeEatFood(newSnake, food)) {
          console.log("eat food");
          setFood(35 - score /* generateFood(newSnake, grid) */);
          setScore((prev) => prev + 1);
          newSnake.push(snake[-1]);
        }
        setSnake(newSnake);
        setGrid(generateGrid(newSnake, food));
      }
    }, 300);
    return () => clearInterval(interval);
  }, [direction, snake, food, grid]);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="text-xl font-semibold flex p-1 gap-2 border-2 border-secondary">
        <div>Score : {score}</div>
      </div>
      <Grid grid={grid} />
    </div>
  );
};
