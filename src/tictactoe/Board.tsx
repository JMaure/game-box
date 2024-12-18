import { Cell } from "./Cell";

interface BoardProps {
  board: Array<string>;
  onClick: (index: number) => void;
}

export const Board: React.FC<BoardProps> = ({ board, onClick }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {board.map((val: string, index: number) => {
        return (
          <Cell key={index} onClick={() => onClick(index)}>
            {val}
          </Cell>
        );
      })}
    </div>
  );
};
