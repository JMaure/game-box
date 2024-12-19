import React from "react";
import { Case } from "./utils";

export const Cell = (props: Case) => {
  return (
    <div className="h-7 w-7 text-center border border-secondary">
      {"" + props.value}
    </div>
  );
};
