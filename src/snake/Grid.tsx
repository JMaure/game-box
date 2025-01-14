import React from "react";

interface GridProps {
  grid: string[];
}

export const Grid: React.FC<GridProps> = ({ grid }) => {
  return (
    <div className="grid grid-cols-20 border border-secondary">
      {grid.map((element, index) => {
        return (
          <div
            key={index}
            className="h-4 w-4 flex items-center justify-center border border-primary bg-secondary text-sm"
          >
            {element}
          </div>
        );
      })}
    </div>
  );
};
