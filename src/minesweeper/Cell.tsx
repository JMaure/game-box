import React from "react";
import { Case } from "./utils";
import { FlagTriangleRight, Skull } from "lucide-react";

type CellType = {
  case: Case;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const Cell = (props: CellType) => {
  if (props.case.value === 9 && props.case.state === "revealed") {
    return (
      <div
        onContextMenu={props.onContextMenu}
        className="h-9 w-9 flex items-center justify-center border border-secondary p-0.5"
      >
        <Skull />
      </div>
    );
  } else if (props.case.state === "revealed") {
    return (
      <div
        className="h-9 w-9 
      -xl font-medium flex items-center justify-center border border-primary"
      >
        {"" + props.case.value}
      </div>
    );
  } else if (props.case.state === "hidden") {
    return (
      <div
        onClick={props.onClick}
        onContextMenu={props.onContextMenu}
        className="h-9 w-9 border border-primary bg-secondary"
      ></div>
    );
  } else if (props.case.state === "marked") {
    return (
      <div
        onClick={props.onClick}
        onContextMenu={props.onContextMenu}
        className="h-9 w-9 flex items-center justify-center border border-primary bg-secondary p-0.5"
      >
        <FlagTriangleRight />
      </div>
    );
  }
};
