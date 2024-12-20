import React from "react";
import { Case } from "./utils";
import { FlagTriangleRight } from "lucide-react";

type CellType = {
  case: Case;
  onClick: () => void;
  onContextMenu: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const Cell: CellType = (props: CellType) => {
  if (props.case.state === "revealed") {
    return (
      <div className="h-7 w-7 text-center border border-secondary">
        {"" + props.case.value}
      </div>
    );
  } else if (props.case.state === "hidden") {
    return (
      <div
        onClick={props.onClick}
        onContextMenu={props.onContextMenu}
        className="h-7 w-7 border border-secondary bg-primary"
      ></div>
    );
  } else if (props.case.state === "marked") {
    return (
      <div
        onContextMenu={props.onContextMenu}
        className="h-7 w-7 border border-secondary bg-primary p-0.5"
      >
        <FlagTriangleRight />
      </div>
    );
  }
};
