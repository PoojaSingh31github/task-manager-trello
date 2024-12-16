import React from 'react';
import { useDrag } from 'react-dnd';

interface BoardCardProps {
  board: { id: string; name: string };
  onDelete: () => void;
}

const BoardCard: React.FC<BoardCardProps> = ({ board, onDelete }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'BOARD',
    item: { id: board.id, name: board.name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      className={`relative p-5 rounded-md shadow-lg bg-blue-600 text-white hover:shadow-xl transition duration-300 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="text-xl font-bold mb-2 truncate">{board.name}</div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute bottom-2 right-2 bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default BoardCard;
