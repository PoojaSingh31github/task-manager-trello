import React, { useEffect, useState } from 'react';
import { getBoards, createBoard, deleteBoard } from '../../api/trelloApi';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BoardCard from './BoardCard';

interface Board {
  id: string;
  name: string;
  dateLastActivity: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState<Board[]>([]);
  const [newBoardName, setNewBoardName] = useState('');

  const handleListOpen = (id: string) => {
    navigate(`/board-details/${id}`);
  };

  const fetchBoards = async () => {
    try {
      const response = await getBoards();
      setBoards(response.data);
    } catch (error) {
      toast.error('Error fetching boards: ' + (error as Error).message);
    }
  };

  const handleCreateBoard = async () => {
    if (!newBoardName) {
      toast.warn('Board name required!');
      return;
    }
    try {
      await createBoard(newBoardName);
      toast.success('Board created successfully!');
      setNewBoardName('');
      fetchBoards();
    } catch (error) {
      toast.error('Error creating board: ' + (error as Error).message);
    }
  };

  const handleDeleteBoard = async (id: string) => {
    try {
      await deleteBoard(id);
      toast.success('Board deleted successfully!');
      fetchBoards();
    } catch (error) {
      toast.error('Error deleting board: ' + (error as Error).message);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <div className="p-6 bg-gray-800 min-h-screen text-white">
      <ToastContainer />
      {/* New Board Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Create a New Board</h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter board name"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={handleCreateBoard}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md font-semibold"
          >
            Create Board
          </button>
        </div>
      </div>

      {/* Boards Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {boards.map((board) => (
          <div
            key={board.id}
            onClick={() => handleListOpen(board.id)}
            className="cursor-pointer"
          >
            <BoardCard
              board={board}
              onDelete={() => handleDeleteBoard(board.id)}
            />
          </div>
        ))}

        {/* Placeholder Create Board Card */}
        <div className="bg-gray-800 rounded-md h-32 flex items-center justify-center text-gray-300 text-lg font-semibold hover:bg-gray-700 cursor-pointer transition duration-300">
          Create new board
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
