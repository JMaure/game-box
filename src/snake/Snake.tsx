import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  generateFood,
  generateGrid,
  isSnakeEatFood,
  isSnakeEatItself,
  isSnakeOutOfGrid,
  isSnakeWin,
  moveSnake,
} from "./utils";
import { Grid } from "./Grid";
import {
  ArrowBigDown,
  ArrowBigLeft,
  ArrowBigRight,
  ArrowBigUp,
} from "lucide-react";

const useInterval = ({
  interval,
  handler,
  enabled = true,
}: {
  interval: number;
  handler: () => void;
  enabled?: boolean;
}) => {
  const callbackRef = useRef(handler);
  useEffect(() => {
    callbackRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) return;
    const intervalId = setInterval(() => {
      callbackRef.current();
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [interval, enabled]);
};

const useEventListener = ({
  eventName,
  handler,
  element = window,
  enabled = true,
}: {
  eventName: string;
  handler: (e: KeyboardEvent) => void;
  element?: HTMLElement | Window;
  enabled?: boolean;
}) => {
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) return;
    const onEvent = (e: KeyboardEvent) => {
      handlerRef.current(e);
    };
    element.addEventListener(eventName, onEvent as EventListener);

    return () => {
      element.removeEventListener(eventName, onEvent as EventListener);
    };
  }, [eventName, element, enabled]);
};

export const Snake = () => {
  const [score, setScore] = useState(0);
  const [snake, setSnake] = useState<Array<number>>([22, 21]);
  const [direction, setDirection] = useState("RIGHT");
  const [food, setFood] = useState(generateFood(snake, []));
  const [grid, setGrid] = useState<Array<string>>(generateGrid(snake, food));
  const [isGameOver, setIsGameOver] = useState(false);

  const handleInterval = () => {
    if (
      isSnakeEatItself(snake) ||
      isSnakeOutOfGrid(snake, direction) ||
      isSnakeWin(snake)
    ) {
      setIsGameOver(true);
    } else {
      const newSnake = moveSnake(snake, direction);
      if (isSnakeEatFood(newSnake, food)) {
        setFood(generateFood(newSnake, grid));
        setGrid(generateGrid(snake, food));
        setScore((prev) => prev + 1);
        newSnake.push(snake[-1]);
      }
      setSnake(newSnake);
      setGrid(generateGrid(newSnake, food));
    }
  };

  useInterval({
    interval: 300,
    handler: handleInterval,
    enabled: !isGameOver,
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key;
    if (
      (key === "ArrowUp" && direction !== "DOWN") ||
      (key === "ArrowDown" && direction !== "UP") ||
      (key === "ArrowLeft" && direction !== "RIGHT") ||
      (key === "ArrowRight" && direction !== "LEFT")
    ) {
      setDirection(key.toUpperCase().replace("ARROW", ""));
    }
  };

  useEventListener({ eventName: "keydown", handler: handleKeyDown });

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="text-xl font-semibold flex p-1 gap-2 border-2 border-secondary">
        <div>Score : {score}</div>
      </div>
      <Grid grid={grid} />
      {isGameOver ? (
        <Replay
          isWin={isSnakeWin(snake)}
          setGrid={setGrid}
          setIsGameOver={setIsGameOver}
          setSnake={setSnake}
          setDirection={setDirection}
        />
      ) : (
        <div className="flex-col items-center">
          <button
            className="w-12 h-12 mx-12 flex items-center justify-center checkbox bg-secondary checkbox-primary"
            onClick={() => {
              if (direction !== "DOWN") setDirection("UP");
            }}
          >
            <ArrowBigUp />
          </button>
          <div className="flex">
            <button
              className="w-12 h-12 flex items-center justify-center checkbox bg-secondary checkbox-primary"
              onClick={() => {
                if (direction !== "RIGHT") setDirection("LEFT");
              }}
            >
              <ArrowBigLeft />
            </button>
            <button className="w-12 h-12 btn btn-disable"></button>
            <button
              className="w-12 h-12 flex items-center justify-center checkbox bg-secondary checkbox-primary"
              onClick={() => {
                if (direction !== "LEFT") setDirection("RIGHT");
              }}
            >
              <ArrowBigRight />
            </button>
          </div>
          <button
            className="w-12 h-12 mx-12 flex items-center justify-center checkbox bg-secondary checkbox-primary"
            onClick={() => {
              if (direction !== "UP") setDirection("DOWN");
            }}
          >
            <ArrowBigDown />
          </button>
        </div>
      )}
    </div>
  );
};

type ReplayType = {
  isWin: boolean;
  setGrid: Dispatch<SetStateAction<string[]>>;
  setIsGameOver: Dispatch<SetStateAction<boolean>>;
  setSnake: Dispatch<SetStateAction<number[]>>;
  setDirection: Dispatch<SetStateAction<string>>;
};

export const Replay = (props: ReplayType) => {
  return (
    <div className="flex flex-col gap-2">
      {props.isWin ? (
        <p className="text-xl font-semibold">Well done !</p>
      ) : (
        <p className="text-xl font-semibold">Try again !</p>
      )}
      <button
        onClick={() => {
          const newSnake = [22, 21];
          const newFood = generateFood(newSnake, []);
          props.setSnake(newSnake);
          props.setGrid(generateGrid(newSnake, newFood));
          props.setDirection("RIGHT");
          props.setIsGameOver(false);
        }}
        className="btn btn-secondary"
      >
        Replay
      </button>
    </div>
  );
};
