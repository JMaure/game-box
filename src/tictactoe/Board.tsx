import { Cell } from "./Cell";

type BoardType = {
  board: Array<string>;
  onClick: (index: number) => void;
};

export const Board = (props: BoardType) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {props.board.map((val: string, index: number) => {
        return (
          <Cell key={index} onClick={() => props.onClick(index)}>
            {val}
          </Cell>
        );
      })}
    </div>
  );
};
