import React from "react";
import { Cell } from ".//Cell";
import { Case } from "./utils";

type GridType = {
  board: Array<Case>;
  onClick: (index: number) => void;
  onContextMenu: (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => void;
};

export const Grid = (props: GridType) => {
  return (
    <div className="grid grid-cols-9 border border-primary">
      {props.board.map((cell, index) => {
        return (
          <Cell
            key={index}
            case={cell}
            onClick={() => props.onClick(index)}
            onContextMenu={(e: React.MouseEvent<HTMLDivElement>) =>
              props.onContextMenu(e, index)
            }
          />
        );
      })}
    </div>
  );
};
