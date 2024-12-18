import React, { useState } from "react";

interface BoardProps {
  board: Array<string>;
  onClick: (index: number) => void;
}

interface CellProps {
  children: string;
  onClick: () => void;
}

const player = {
  X: "X",
  O: "O",
};

const getCurrentPlayer = (board: Array<string>) => {
  const nbPlays = board.filter((cell) => cell !== "").length;
  return nbPlays % 2 ? player.O : player.X;
};

const checkWinner = (board: Array<string>) => {
  return board[0];
};

export const TicTacToe = () => {
  const [board, setBoard] = useState<Array<string>>(Array(9).fill(""));
  const currentPlayer: string = getCurrentPlayer(board);

  const handleClick = (index: number) => {
    if (board[index] === "") {
      const updatedBoard = [...board];
      updatedBoard[index] = currentPlayer;
      setBoard(updatedBoard);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p>{`It's ${currentPlayer} turn : `}</p>
      <Board board={board} onClick={handleClick} />
      <div>test</div>
    </div>
  );
};

const Board: React.FC<BoardProps> = ({ board, onClick }) => {
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

const Cell: React.FC<CellProps> = ({ children, onClick }) => {
  return (
    <div
      className="w-10 h-10 border border-primary text-center text-xl font-bold"
      onClick={onClick}
    >
      {children}
    </div>
  );
};
