"use client";

import { MenuGames } from "./MenuGames";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const games: Array<string> = ["TicTacToe", "Minesweeper", "Snake"];

  const searchParams = useSearchParams();
  let currentGame: string | null = searchParams.get("game");
  if (!currentGame) currentGame = "";
  console.log(currentGame);

  return (
    <main className="m-auto h-h-full flex max-w-4xl px-4">
      <div className="mb-4 mt-8 flex flex-1 gap-4 py-2  max-lg:flex-col">
        <MenuGames games={games} currentGame={currentGame} />
      </div>
      <div className="mb-4 mt-8 mx-4 h-fit w-full">
        {currentGame === "" && <p>Home Page</p>}
        {currentGame === "TicTacToe" && <p>Tic Tac Toe</p>}
        {currentGame === "Minesweeper" && <p>Minesweeper</p>}
        {currentGame === "Snake" && <p>Snake</p>}
      </div>
    </main>
  );
}
