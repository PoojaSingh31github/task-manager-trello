import { getCards, createCard } from "../api/trelloApi"; 
import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    if (itemId) {
      fetchCards();
    }
  }, [itemId]);

  return (
    <div>
      {loading ? (
        <p>Loading cards...</p>
      ) : cards.length > 0 ? (
        <ul className="space-y-2">
          {cards.map((card) => (
            <li
              key={card.id}
              className="p-2 bg-blue-100 rounded-md shadow text-blue-700"
            >
              {card.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No cards found</p>
      )}

      <div className="mt-3">
        <input
          type="text"
          placeholder="Add new task"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          className="border p-2 w-full rounded-md"
        />
        <button
          onClick={addNewTask}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md w-full"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default BoardCardsList;
