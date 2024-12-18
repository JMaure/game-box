import React from "react";
import { useState } from "react";

const Player = {
  X: "X",
  O: "O",
};

const getCurrentPlayer = (board) => {
  const moves = board.filter((val) => val !== "").length;
  return moves % 2 === 0 ? Player.X : Player.O;
};

export const TicTacToe2 = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const currentPlayer = getCurrentPlayer(board);
  const winner = checkWinner(board);

  const handleClick = (index) => {
    if (board[index] !== null || winner !== null) {
      return;
    }

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);
  };

  return (
    <div className="flex justify-center flex-col items-center h-screens border border-solid border-gray-950">
      <p>{`It's ${currentPlayer}'s turn`}</p>
      <Board board={board} onClick={handleClick} />
      {winner && (
        <div className="mt-4 text-2xl font-semibold">
          {winner} wins the game!
        </div>
      )}
    </div>
  );
};

const checkWinner = (board: Array<string>) => {
  const winningMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningMoves.length; i++) {
    const [a, b, c] = winningMoves[i];
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const Cell = ({ value, onClick }) => (
  <div
    className="border border-green-800 w-16 h-16 flex items-center justify-center text-4xl cursor-pointer"
    onClick={onClick}
  >
    {value}
  </div>
);

const Board = ({ board, onClick }) => (
  <div className="grid grid-cols-3 gap-2">
    {board.map((value, index) => (
      <React.Fragment key={index}>
        <Cell value={value} onClick={() => onClick(index)} />
      </React.Fragment>
    ))}
  </div>
);
