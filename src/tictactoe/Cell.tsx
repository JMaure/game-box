type CellType = {
  children: string;
  onClick: () => void;
};

export const Cell = (props: CellType) => {
  return (
    <div
      className="w-10 h-10 border-2 flex border-secondary items-center justify-center text-xl font-bold"
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};
