import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getLists } from "../api/trelloApi";
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
  
  useEffect(() => {
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

    if (id) {
      fetchListsAndCards();
    }
  }, [id]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 h-screen fixed top-0 left-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-64 p-5 w-full">
        <div className="max-w-6xl mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Board Details</h1>

          {loading ? (
            <div className="flex flex-col items-center h-52">
              <div className="animate-spin h-12 w-12 border-t-2 border-blue-500 border-solid rounded-full"></div>
            </div>
          ) : (
            <div className="flex flex-row gap-4 bg-gray-200">
              {lists.length > 0 ? (
                lists.map((list) => (
                  <div
                    key={list.id}
                    className="flex flex-col p-4 border border-gray-300 rounded-md shadow-sm w-1/3 bg-white"
                  >
                    <p className="text-lg font-semibold text-gray-700 mb-2">
                      {list.name}
                    </p>
                    <BoardCardsList itemId={list.id} />
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No lists found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardDetails;
