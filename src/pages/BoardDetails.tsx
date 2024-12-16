import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { createBoard, getLists } from "../api/trelloApi";
import Sidebar from "../components/appComponent/Sidebar";
import BoardCardsList from "./BoardCardsList";

interface ListItemType {
  id: string;
  name: string;
}

const BoardDetails: React.FC = () => {
  const { id } = useParams<{ id: any }>();
  const [lists, setLists] = useState<ListItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newListName, setNewListName] = useState<string>("");
  const [isAddingList, setIsAddingList] = useState<boolean>(false);

  const addNewList = async () => {
    if (!newListName.trim()) {
      alert("List name cannot be empty!"); // Keep this or replace it with a toast
      return;
    }

    try {
      setIsAddingList(true); // Set loading state
      const response = await createBoard(newListName); 
      setLists((prevLists) => [...prevLists, response.data]); // Optimistically update state
      setNewListName(""); // Clear input
    } catch (error) {
      console.error("Error adding new list:", error);
      alert("Failed to create the list. Please try again.");
    } finally {
      setIsAddingList(false); // Reset loading state
    }
  };
  const fetchListsAndCards = async () => {
    setLoading(true);
    try {
      const response = await getLists(id);
      setLists(response.data);
    } catch (error) {
      console.error("Error fetching lists and cards:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchListsAndCards();
    }
  }, [id]);

  return (
    <div className="flex bg-[#032B4F] min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 h-screen fixed top-0 left-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64 p-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
          {loading ? (
            <div className="flex justify-center items-center w-full h-64">
              <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full"></div>
            </div>
          ) : (
            <>
              {lists.length > 0 ? (
                lists.map((list) => (
                  <div
                    key={list.id}
                    className="w-64 flex-shrink-0 bg-black text-white rounded-lg shadow-lg"
                  >
                    <div className="p-3 border-b border-gray-700 flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{list.name}</h3>
                      <button className="text-gray-300 hover:text-white">
                        ⋮
                      </button>
                    </div>
                    <div className="p-3 space-y-2 min-h-[300px]">
                      <BoardCardsList itemId={list.id} />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No lists found</p>
              )}
              {/* New List Column */}
              <div className="w-64 flex-shrink-0 bg-black text-white rounded-lg shadow-lg">
              <div className="p-3 space-y-2 min-h-[300px]">
                  <input
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="Enter a title or paste a link"
                    className="w-full p-2 text-sm bg-gray-700 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  />
                  <button
                    className={`px-4 py-1 bg-[#3e7da0] text-white rounded-xl hover:bg-blue-400 ${
                      isAddingList ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={addNewList}
                    disabled={isAddingList} 
                  >
                    {isAddingList ? "Adding..." : "+ Add new List"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardDetails;
