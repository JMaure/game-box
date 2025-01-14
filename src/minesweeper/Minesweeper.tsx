import { Dispatch, SetStateAction, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import { Grid } from "./Grid";
import {
  Case,
  GRID_HEIGHT,
  GRID_WIDTH,
  initGrid,
  revealAdjacentCase0,
  NB_MINES,
  nbMarkedMines,
  isWin,
  isLoose,
} from "./utils";
import { Bomb, Eye, FlagTriangleRight, Timer } from "lucide-react";

export const Minesweeper = () => {
  const [grid, setGrid] = useState<Array<Case>>(
    Array(GRID_HEIGHT * GRID_WIDTH).fill({ value: 0, state: "hidden" })
  );
  const [init, setInit] = useState(false);
  const remainingMines = NB_MINES - nbMarkedMines(grid);
  const [markMine, setMarkMine] = useState(false);

  const { seconds, minutes, isRunning, start, pause, reset } = useStopwatch();

  if (!init) {
    initGrid(setGrid);
    setInit(true);
    reset();
    pause();
  }
  const win: boolean = isWin(grid);
  const loose: boolean = isLoose(grid);
  const endGame: boolean = win || loose;

  const leftClick = (index: number) => {
    if (!isRunning) start();
    if (grid[index].state === "hidden") {
      const updatedGrid = [...grid];
      updatedGrid[index] = { value: grid[index].value, state: "revealed" };
      if (updatedGrid[index].value === 0) {
        revealAdjacentCase0(updatedGrid, index);
      }
      setGrid(updatedGrid);
    }
  };
  if (win && isRunning) {
    pause();
  }
  if (loose && isRunning) {
    pause();
  }

  const rightClick = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault();
    if (grid[index].state === "hidden") {
      const updatedGrid = [...grid];
      updatedGrid[index] = { value: grid[index].value, state: "marked" };
      setGrid(updatedGrid);
    }
    if (grid[index].state === "marked") {
      const updatedGrid = [...grid];
      updatedGrid[index] = { value: grid[index].value, state: "hidden" };
      setGrid(updatedGrid);
    }
  };

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    if (markMine) return rightClick(event, index);
    else return leftClick(index);
  };

  const handleToggle = () => {
    setMarkMine(!markMine);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex gap-4">
        <MineCounter mines={remainingMines} />
        <div className="text-xl font-semibold flex p-1 gap-2 border-2 border-secondary">
          <Timer />
          <span>{minutes}</span>:<span>{seconds}</span>
        </div>
      </div>
      <Grid
        board={grid}
        onClick={endGame ? () => {} : handleClick}
        onContextMenu={endGame ? () => {} : rightClick}
      />
      {endGame ? (
        <Replay isWin={win} setInit={setInit} reset={reset} />
      ) : (
        <button
          className="w-12 h-12 flex items-center justify-center checkbox bg-secondary checkbox-primary"
          onClick={handleToggle}
        >
          {markMine ? <FlagTriangleRight /> : <Eye />}
        </button>
      )}
    </div>
  );
};

const MineCounter = ({ mines }: { mines: number }) => {
  return (
    <div className="flex p-1 gap-2 border-2 border-secondary">
      <Bomb />
      <p className="text-xl font-semibold">{mines}</p>
    </div>
  );
};

type ReplayType = {
  isWin: boolean;
  setInit: Dispatch<SetStateAction<boolean>>;
  reset: (offsetTimestamp?: Date, autoStart?: boolean) => void;
};

const Replay = (props: ReplayType) => {
  return (
    <div className="flex flex-col gap-2">
      {props.isWin ? (
        <p className="text-xl font-semibold">Well done !</p>
      ) : (
        <p className="text-xl font-semibold">Try again !</p>
      )}
      <button
        onClick={() => {
          props.setInit(false);
          props.reset();
        }}
        className="btn btn-secondary"
      >
        Replay
      </button>
    </div>
  );
};
