import React from "react";

interface GridProps {
  grid: string[];
}

export const Grid: React.FC<GridProps> = ({ grid }) => {
  return (
    <div className="grid grid-cols-20 border border-primary">
      {grid.map((element, index) => {
        if (element === "") {
          return (
            <div
              key={index}
              className="h-4 w-4 flex items-center justify-center border border-secondary bg-secondary"
            ></div>
          );
        } else if (element === "O" || element === "H") {
          return (
            <div
              key={index}
              className="h-4 w-4 flex items-center justify-center border border-primary bg-primary"
            ></div>
          );
        } else if (element === "F") {
          return (
            <div
              key={index}
              className="h-4 w-4 flex items-center justify-center border border-accent bg-accent"
            ></div>
          );
        }
      })}
    </div>
  );
};
