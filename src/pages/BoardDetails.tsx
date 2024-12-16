import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getLists } from "../api/trelloApi";
import Sidebar from "../components/appComponent/Sidebar";

interface ListItemType {
  id: string;
  name: string;
}

const BoardDetails: React.FC = () => {
  const { id } = useParams<{ id: any }>();
  const [list, setList] = useState<ListItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        const response = await getLists(id);
        setList(response.data);
      } catch (error) {
        console.error("Error fetching list:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchList();
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
        <div className="max-w-3xl mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Board Details</h1>

          {loading ? (
            <div className="flex justify-center items-center h-52">
              <div className="animate-spin h-12 w-12 border-t-2 border-blue-500 border-solid rounded-full"></div>
            </div>
          ) : (
            <div>
              {list.length > 0 ? (
                <ul>
                  {list.map((item) => (
                    <li
                      key={item.id}
                      className="p-4 border border-gray-200 rounded-md shadow-sm mb-3 hover:shadow-md transition duration-300"
                    >
                      <p className="text-lg font-semibold text-gray-700">{item.name}</p>
                    </li>
                  ))}
                </ul>
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
