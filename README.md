# Trello task manager

This is a **Trello clone application** that provides functionalities to create boards, lists, and cards, perform CRUD operations, and manage them using drag and drop features. Notifications are handled using **react-toastify**.

---

## 📦 Features

### Create, Read, Update, and Delete (CRUD):
- **Boards**
- **Lists** within Boards
- **Cards** within Lists

### Drag and Drop:
Move cards between lists using:
- `@hello-pangea/dnd` or `react-dnd`

### User Notifications:
- Toast notifications for success/error messages using `react-toastify`.

---

## 🛠️ Project Structure
```
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

```

## 👨‍💻 Contributors
self:-Pooja Singh


## 🎉 Future Improvements
- Real-time updates using WebSockets.
- Authentication for user-specific boards.
- Better error handling for API failures.

  
## 🌐 Deployed Link
https://task-manager-trello-weld.vercel.app/

