Trello Clone Project
This is a Trello clone application that provides functionalities to create boards, lists, and cards, perform CRUD operations, and manage them using drag and drop features. Notifications are handled using react-toastify.

📦 Features
Create, Read, Update, and Delete (CRUD):
Boards
Lists within Boards
Cards within Lists
Drag and Drop functionality to move cards between lists using:
@hello-pangea/dnd or react-dnd.
User Notifications:
Toast notifications for success/error messages using react-toastify.
🚀 Project Setup
Follow these steps to set up the project locally:

1. Clone the Repository
bash
Copy code
git clone <repository-url>
cd <project-directory>
2. Install Dependencies
Run the following command to install all required dependencies:

bash
Copy code
npm install
3. Dependencies Used
Axios: API calls to Trello.
@hello-pangea/dnd or react-dnd: For drag and drop functionality.
react-toastify: For displaying toast notifications.
Install them if needed:

bash
Copy code
npm install axios @hello-pangea/dnd react-dnd react-toastify
⚙️ API Integrations
The following Trello APIs are integrated into the project.

Boards APIs
Operation	Method	Endpoint	Example Usage
Get Boards	GET	/members/me/boards	getBoards()
Create Board	POST	/boards	createBoard("Board Name")
Delete Board	DELETE	/boards/{boardId}	deleteBoard("boardId")
Lists APIs
Operation	Method	Endpoint	Example Usage
Get Lists	GET	/boards/{boardId}/lists	getLists("boardId")
Create List	POST	/lists	createList("boardId", "List Name")
Delete List	DELETE	/lists/{listId}	deleteList("listId")
Cards APIs
Operation	Method	Endpoint	Example Usage
Get Cards	GET	/lists/{listId}/cards	getCards("listId")
Create Card	POST	/cards	createCard("listId", "Card Name")
Update Card	PUT	/cards/{cardId}	updateCard("cardId", updates)
Delete Card	DELETE	/cards/{cardId}	deleteCard("cardId")
🧩 Drag and Drop Implementation
The project uses @hello-pangea/dnd (or react-dnd) for drag-and-drop functionality to move cards between lists.

Example Usage of @hello-pangea/dnd:
tsx
Copy code
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const onDragEnd = (result) => {
  const { source, destination } = result;
  if (!destination) return; // If dropped outside a list

  // Logic to update cards in state or API
};

<DragDropContext onDragEnd={onDragEnd}>
  <Droppable droppableId="list-1">
    {(provided) => (
      <div ref={provided.innerRef} {...provided.droppableProps}>
        {cards.map((card, index) => (
          <Draggable key={card.id} draggableId={card.id} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                {card.name}
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
</DragDropContext>
🔔 Toast Notifications
react-toastify is used to display notifications for success, error, or other user feedback.

Installation:
bash
Copy code
npm install react-toastify
Example Usage:
tsx
Copy code
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initialize Toastify
toast.configure();

// Success Notification
toast.success("Task added successfully!");

// Error Notification
toast.error("Failed to add task.");
🛠️ Project Structure
graphql
Copy code
src/
├── api/
│   └── trelloApi.ts       # API functions for boards, lists, and cards
├── components/
│   ├── Sidebar.tsx        # Sidebar component
│   └── BoardCardsList.tsx # List and Cards display
├── pages/
│   └── BoardDetails.tsx   # Board details page
├── utils/
│   └── TrelloAxios.ts     # Axios instance configuration
└── App.tsx                # Main app component
📝 Usage Guide
Create a Board:

Use createBoard API to create a new board.
Example:
ts
Copy code
await createBoard("My New Board");
Add Lists:

Use createList API to create lists under a specific board.
ts
Copy code
await createList(boardId, "To Do");
Add Cards:

Use createCard API to add cards under specific lists.
ts
Copy code
await createCard(listId, "New Task");
Drag and Drop:

Move cards between lists using the drag-and-drop feature.
Toastify Notifications:

Notifications appear when tasks are added, updated, or removed.
🛠️ Run the Project
Start the development server:

bash
Copy code
npm run dev
Open the project in your browser:

arduino
Copy code
http://localhost:3000
🎉 Future Improvements
Real-time updates using WebSockets.
Authentication for user-specific boards.
Better error handling for API failures.
👨‍💻 Contributors
Your Name (Replace with your details)
📄 License
This project is licensed under the MIT License.

Let me know if you need further edits or additions! 🚀





##deployed link
https://task-manager-trello-weld.vercel.app/
