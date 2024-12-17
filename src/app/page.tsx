"use client";

import { Header } from "./Header";
import { MenuGames } from "./MenuGames";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const games: Array<string> = ["TicTacToe", "Minesweeper", "Snake"];

  const searchParams = useSearchParams();
  let currentGame: string | null = searchParams.get("game");
  if (!currentGame) currentGame = "";
  console.log(currentGame);

  return (
    <main className="max-w-4xl m-auto border border-solid border-gray-800s">
      <Header />
      <div className="m-auto h-full flex">
        <div className="px-4 py-8 flex flex-1 gap-4 bg-primary/50 max-lg:flex-col">
          <MenuGames games={games} currentGame={currentGame} />
        </div>
        <div className="mb-4 mt-8 mx-4 h-fit w-full">
          {currentGame === "" && (
            <p className="text-justify  text-lg">
              Envie de vous détendre et de vous amuser ? Game Box est fait pour
              vous ! Redécouvrez les jeux qui ont marqué votre enfance ou
              initiez-vous à de nouveaux classiques. Avec Game Box, le fun est
              garanti !
            </p>
          )}
          {currentGame === "TicTacToe" && <p>Tic Tac Toe</p>}
          {currentGame === "Minesweeper" && <p>Minesweeper</p>}
          {currentGame === "Snake" && <p>Snake</p>}
        </div>
      </div>
    </main>
  );
}
