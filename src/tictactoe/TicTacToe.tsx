import React, { useState } from "react";
import { checkWinner, fullBoard, getCurrentPlayer } from "./utils";
import { Board } from "./Board";

export const TicTacToe = () => {
  const [board, setBoard] = useState<Array<string>>(Array(9).fill(""));
  const currentPlayer: string = getCurrentPlayer(board);
  const winner: string = checkWinner(board);
  const complete = fullBoard(board);

  const handleClick = (index: number) => {
    if (board[index] === "" && winner === "") {
      const updatedBoard = [...board];
      updatedBoard[index] = currentPlayer;
      setBoard(updatedBoard);
    }
  };

  const resetGame = () => {
    const newBoard = Array(9).fill("");
    setBoard(newBoard);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p>{`It's player ${currentPlayer} turn : `}</p>
      <Board board={board} onClick={handleClick} />
      {winner !== "" ? (
        <div className="flex flex-col gap-2">
          <p>{`Player ${winner} wins !`}</p>
          <button onClick={resetGame} className="btn btn-secondary">
            Replay
          </button>
        </div>
      ) : null}
      {complete && winner === "" ? (
        <div className="flex flex-col gap-2">
          <p>{"It's a draw !"}</p>
          <button onClick={resetGame} className="btn btn-secondary">
            Replay
          </button>
        </div>
      ) : null}
    </div>
  );
};
