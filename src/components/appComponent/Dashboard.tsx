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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setIsModalOpen(false);
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

      {/* Boards Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {boards.map((board) => (
          <div
            key={board.id}
            onClick={() => handleListOpen(board.id)}
            className="cursor-pointer  "
          >
            <BoardCard
              board={board}
              onDelete={() => handleDeleteBoard(board.id)}
            />
          </div>
        ))}

        {/* Placeholder Create Board Card */}
        <div
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-800 rounded-md h-32 flex items-center justify-center text-gray-300 text-lg font-semibold hover:bg-gray-700 cursor-pointer transition duration-300"
        >
          Add New Board
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white w-96">
            <h2 className="text-2xl font-bold mb-4">Create a New Board</h2>
            <input
              type="text"
              placeholder="Enter board name"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBoard}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md font-semibold"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
