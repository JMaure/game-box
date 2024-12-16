import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 justify-center items-center m-auto max-w-4xl">
      <Link href={`/?game=tictactoe`} className={"btn btn-primary w-36"}>
        Tic Tac Toe
      </Link>
      <Link href={`/?game=minesweeper`} className={"btn btn-primary w-36"}>
        Minesweeper
      </Link>
      <Link href={`/?game=snake`} className={"btn btn-primary w-36"}>
        Sanke
      </Link>
    </main>
  );
}
