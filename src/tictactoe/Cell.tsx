interface CellProps {
  children: string;
  onClick: () => void;
}

export const Cell: React.FC<CellProps> = ({ children, onClick }) => {
  return (
    <div
      className="w-10 h-10 border border-secondary text-center text-xl font-bold"
      onClick={onClick}
    >
      {children}
    </div>
  );
};
