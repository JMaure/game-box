import React from "react";
import { Cell } from ".//Cell";
import { Case } from "./utils";

type GridType = {
  board: Array<Case>;
  onClick: (event: React.MouseEvent<HTMLDivElement>, index: number) => void;
  onContextMenu: (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => void;
};

export const Grid = (props: GridType) => {
  return (
    <div className="grid grid-cols-9 border border-secondary">
      {props.board.map((cell, index) => {
        return (
          <Cell
            key={index}
            case={cell}
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
              props.onClick(e, index)
            }
            onContextMenu={(e: React.MouseEvent<HTMLDivElement>) =>
              props.onContextMenu(e, index)
            }
          />
        );
      })}
    </div>
  );
};
