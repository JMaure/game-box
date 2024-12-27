"use client";

import { Header } from "./Header";
import { MenuGames } from "./MenuGames";
import { useSearchParams } from "next/navigation";
import { TicTacToe } from "@/tictactoe/TicTacToe";
import { Minesweeper } from "./minesweeper/Minesweeper";
import { Suspense, useState } from "react";

export default function Home() {
  const games: Array<string> = ["TicTacToe", "Minesweeper", "Snake"];

  return (
    <main className="max-w-3xl m-auto flex flex-col h-full md:border-x-2 md:border-secondary">
      <Header />
      <div className="px-4 py-3 flex flex-1 gap-4 overflow-auto max-md:flex-col">
        <Suspense fallback={<DefaultPage games={games} />}>
          <Page games={games} />
        </Suspense>
      </div>
    </main>
  );
}

type PageType = {
  games: string[];
};

const Page = (props: PageType) => {
  const [currentGame, setCurrentGame] = useState("");
  const searchParams = useSearchParams();
  const param = searchParams.get("game");
  const [lastParam, setLastParam] = useState("");
  if (param !== null && param !== lastParam) {
    setLastParam(param);
    setCurrentGame(param);
  }
  return (
    <>
      <MenuGames games={props.games} currentGame={currentGame} />
      <div className="flex-1 justify-items-center text-justify text-xl font-semibold overflow-auto">
        {currentGame === "" && (
          <>
            <p>
              Envie de vous détendre et de vous amuser ? Game Box est fait pour
              vous ! Redécouvrez les jeux qui ont marqué votre enfance ou
              initiez-vous à de nouveaux classiques.
            </p>
            <p className="mt-4">Avec Game Box, le fun est garanti !</p>
          </>
        )}
        {currentGame === "TicTacToe" && <TicTacToe />}
        {currentGame === "Minesweeper" && <Minesweeper />}
        {currentGame === "Snake" && <p>Snake</p>}
      </div>
    </>
  );
};

const DefaultPage = ({ games }: { games: string[] }) => {
  return (
    <>
      <MenuGames games={games} currentGame={""} />
      <div className="flex-1 justify-items-center text-justify text-xl font-semibold overflow-auto">
        <p>
          Envie de vous détendre et de vous amuser ? Game Box est fait pour vous
          ! Redécouvrez les jeux qui ont marqué votre enfance ou initiez-vous à
          de nouveaux classiques.
        </p>
        <p className="mt-4">Avec Game Box, le fun est garanti !</p>
      </div>
    </>
  );
};
