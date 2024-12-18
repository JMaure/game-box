"use client";

import { Header } from "./Header";
import { MenuGames } from "./MenuGames";
import { useSearchParams } from "next/navigation";
import { TicTacToe } from "@/tictactoe/TicTacToe";

export default function Home() {
  const games: Array<string> = ["TicTacToe", "Minesweeper", "Snake"];

  const searchParams = useSearchParams();
  let currentGame: string | null = searchParams.get("game");
  if (!currentGame) currentGame = "";

  return (
    <main className="max-w-4xl m-auto">
      <Header />
      <div className="m-auto h-full flex">
        <div className="px-4 py-8 flex flex-1 gap-4 bg-primary/90 max-lg:flex-col">
          <MenuGames games={games} currentGame={currentGame} />
        </div>
        <div className="mb-4 mt-8 mx-4 min-h-80 w-full">
          {currentGame === "" && (
            <p className="text-justify  text-lg">
              Envie de vous détendre et de vous amuser ? Game Box est fait pour
              vous ! Redécouvrez les jeux qui ont marqué votre enfance ou
              initiez-vous à de nouveaux classiques. Avec Game Box, le fun est
              garanti !
            </p>
          )}
          {currentGame === "TicTacToe" && <TicTacToe />}
          {currentGame === "Minesweeper" && <p>Minesweeper</p>}
          {currentGame === "Snake" && <p>Snake</p>}
        </div>
      </div>
    </main>
  );
}
