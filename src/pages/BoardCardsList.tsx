import React, { useEffect, useState } from "react";
import { getCards, createCard } from "../api/trelloApi";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

interface CardItem {
  id: string;
  name: string;
}

interface BoardCardsListProps {
  itemId: string;
}

const BoardCardsList: React.FC<BoardCardsListProps> = ({ itemId }) => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newTaskName, setNewTaskName] = useState<string>("");

  const fetchCards = async () => {
    setLoading(true);
    try {
      const res = await getCards(itemId);
      setCards(res.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  };

  const addNewTask = async () => {
    if (!newTaskName.trim()) return alert("Task name cannot be empty!");

    try {
      await createCard(itemId, newTaskName);
      setNewTaskName("");
      fetchCards();
    } catch (error) {
      console.error("Error adding new task:", error);
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedCards = Array.from(cards);
    const [removed] = reorderedCards.splice(result.source.index, 1);
    reorderedCards.splice(result.destination.index, 0, removed);

    setCards(reorderedCards); // Update cards after drag
  };

  useEffect(() => {
    if (itemId) {
      fetchCards();
    }
  }, [itemId]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={itemId} type="CARD">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {/* Cards Section */}
            {loading ? (
              <p className="text-gray-400 text-sm italic">Loading cards...</p>
            ) : cards.length > 0 ? (
              <ul className="space-y-2">
                {cards.map((card, index) => (
                  <Draggable
                    key={card.id}
                    draggableId={card.id}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-3 bg-gray-800 text-white rounded-md shadow-sm flex justify-between items-center"
                      >
                        <span>{card.name}</span>
                        <button className="text-gray-400 hover:text-white">
                          ⋮
                        </button>
                      </li>
                    )}
                  </Draggable>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No cards found</p>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Add New Task Section */}
      <div className="mt-3">
        <input
          type="text"
          placeholder="Enter a task name"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          className="w-full p-2 text-sm bg-gray-700 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
        <div className="p-3 border-t border-gray-700">
          <button
            className="text-gray-300 hover:text-white"
            onClick={addNewTask}
          >
            + Add new Task
          </button>
        </div>
      </div>
    </DragDropContext>
  );
};

export default BoardCardsList;
