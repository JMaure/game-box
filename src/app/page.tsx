"use client";

import { Header } from "./Header";
import { MenuGames } from "./MenuGames";
import { useSearchParams } from "next/navigation";
import { TicTacToe } from "@/tictactoe/TicTacToe";
import { Minesweeper } from "../minesweeper/Minesweeper";
import { Suspense, useState } from "react";
import { Snake } from "@/snake/Snake";

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
            <p className="mt-4">Game Box: Your ticket to fun!</p>
            <p>
              Ready to unwind and play? Game Box is your go-to destination.
              Relive the games you loved as a kid or dive into new classics.
            </p>
          </>
        )}
        {currentGame === "TicTacToe" && <TicTacToe />}
        {currentGame === "Minesweeper" && <Minesweeper />}
        {currentGame === "Snake" && <Snake />}
      </div>
    </>
  );
};

const DefaultPage = ({ games }: { games: string[] }) => {
  return (
    <>
      <MenuGames games={games} currentGame={""} />
      <div className="flex-1 justify-items-center text-justify text-xl font-semibold overflow-auto">
        <p className="mt-4">Game Box: Your ticket to fun!</p>
        <p>
          Ready to unwind and play? Game Box is your go-to destination. Relive
          the games you loved as a kid or dive into new classics.
        </p>
      </div>
    </>
  );
};
