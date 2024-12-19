import { Cell } from ".//Cell";
import { Case } from "./utils";

type GridType = {
  board: Array<Case>;
};

export const Grid = (props: GridType) => {
  return (
    <div className="grid grid-cols-9 border border-primary">
      {props.board.map((cell, index) => {
        return <Cell key={index} {...cell} />;
      })}
    </div>
  );
};
