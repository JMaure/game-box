import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface MenuGamesProps {
  games: string[];
  currentGame: string | null;
}
interface MenuItemProps {
  filter: string | null;
  children: string;
  isActive: boolean;
}

export const MenuGames: React.FC<MenuGamesProps> = ({ games, currentGame }) => {
  return (
    <div className="flex flex-wrap w-full gap-4 lg:max-w-[200px] lg:flex-col">
      <MenuItem filter="" isActive={!currentGame}>
        Home Page
      </MenuItem>
      {games.map((game: string) => (
        <MenuItem key={game} filter={game} isActive={game === currentGame}>
          {game}
        </MenuItem>
      ))}
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ filter, children, isActive }) => {
  return (
    <Link
      href={`/?game=${filter}`}
      className={clsx("btn btn-primary  w-28", {
        "btn-active": isActive,
      })}
    >
      {children}
    </Link>
  );
};