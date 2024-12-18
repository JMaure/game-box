export const player = {
  X: "X",
  O: "O",
};

export const getCurrentPlayer = (board: Array<string>) => {
  const nbPlays = board.filter((cell) => cell !== "").length;
  return nbPlays % 2 ? player.O : player.X;
};

export const checkWinner = (board: Array<string>) => {
  const winningMoves: Array<Array<number>> = [
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
    if (board[a] && board[b] === board[a] && board[c] === board[a]) {
      return board[a];
    }
  }
  return "";
};

export const fullBoard = (board: Array<string>) => {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") return false;
  }
  return true;
};
