import { useState } from "react";
import { Grid } from "./Grid";
import { Case, GRID_HEIGHT, GRID_WIDTH, initGrid, NB_MINES } from "./utils";

export const Minesweeper = () => {
  const [grid, setGrid] = useState<Array<Case>>(
    Array(GRID_HEIGHT * GRID_WIDTH).fill({ value: 0, state: "hidden" })
  );
  const [init, setInit] = useState(false);
  if (!init) {
    initGrid(grid, setGrid);
    setInit(true);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p className="">Minesweeper</p>
      <Grid board={grid} />
    </div>
  );
};
