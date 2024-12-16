import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getLists } from "../api/trelloApi";
import Sidebar from "../components/appComponent/Sidebar";
import BoardCardsList from "./BoardCardsList";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

interface ListItemType {
  id: string;
  name: string;
}

const BoardDetails: React.FC = () => {
  const { id } = useParams<{ id: any }>();
  const [lists, setLists] = useState<ListItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedLists = Array.from(lists);
    const [removed] = reorderedLists.splice(result.source.index, 1);
    reorderedLists.splice(result.destination.index, 0, removed);

    setLists(reorderedLists);
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
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="lists" direction="horizontal" type="LIST">
            {(provided) => (
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {loading ? (
                  <div className="flex justify-center items-center w-full h-64">
                    <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-solid rounded-full"></div>
                  </div>
                ) : (
                  <>
                    {lists.map((list, index) => (
                      <Draggable
                        key={list.id}
                        draggableId={list.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="w-64 flex-shrink-0 bg-black text-white rounded-lg shadow-lg"
                          >
                            <div className="p-3 border-b border-gray-700 flex justify-between items-center">
                              <h3 className="text-lg font-semibold">
                                {list.name}
                              </h3>
                            </div>
                            <div className="p-3 space-y-2 min-h-[300px]">
                              <BoardCardsList itemId={list.id} />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {/* New List Column */}
                    <div className="w-64 flex-shrink-0 bg-black text-white rounded-lg shadow-lg">
                      <div className="p-3 space-y-2 min-h-[300px]">
                        <input
                          placeholder="Enter a title or paste a link"
                          className="w-full p-2 text-sm bg-gray-700 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                        <button
                          className="px-4 py-1 bg-[#3e7da0] text-white rounded-xl hover:bg-blue-400" 
                           > + Add New List
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default BoardDetails;
