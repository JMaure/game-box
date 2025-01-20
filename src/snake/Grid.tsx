import clsx from "clsx";
import React from "react";

interface GridProps {
  grid: string[];
}

export const Grid: React.FC<GridProps> = ({ grid }) => {
  return (
    <div className="grid grid-cols-20 border border-primary">
      {grid.map((element, index) => {
        return (
          <div
            key={index}
            className={clsx(
              "h-4 w-4 flex items-center justify-center border",
              { "border-secondary bg-secondary": element === "" },
              {
                "border-primary bg-primary": element === "O" || element === "H",
              },
              { "border-accent bg-accent": element === "F" }
            )}
          ></div>
        );
      })}
    </div>
  );
};
