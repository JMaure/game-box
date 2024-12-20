import { useState } from "react";
import { Grid } from "./Grid";
import {
  Case,
  GRID_HEIGHT,
  GRID_WIDTH,
  initGrid,
  revealAdjacentCase0,
  NB_MINES,
} from "./utils";

export const Minesweeper = () => {
  const [grid, setGrid] = useState<Array<Case>>(
    Array(GRID_HEIGHT * GRID_WIDTH).fill({ value: 0, state: "hidden" })
  );
  const [init, setInit] = useState(false);
  if (!init) {
    initGrid(grid, setGrid);
    setInit(true);
  }

  const handleClick = (index: number) => {
    if (grid[index].state === "hidden") {
      const updatedGrid = [...grid];
      updatedGrid[index] = { value: grid[index].value, state: "revealed" };
      if (updatedGrid[index].value === 0) {
        revealAdjacentCase0(updatedGrid, index);
      }
      setGrid(updatedGrid);
    }
  };

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

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p className="">Minesweeper</p>
      <Grid board={grid} onClick={handleClick} onContextMenu={rightClick} />
      <button
        className=" btn btn-secondary"
        onClick={() => alert("left click")}
        onContextMenu={() => alert("right click")}
      >
        right click
      </button>
    </div>
  );
};
