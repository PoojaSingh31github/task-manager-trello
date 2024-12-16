import { apiClient } from "../utils/TrelloAxios";

export const getBoards = async () => apiClient.get("/members/me/boards");

export const createBoard = async (name: string) =>
  apiClient.post("/boards", { name });

export const deleteBoard = async (boardId: string) =>
  apiClient.delete(`/boards/${boardId}`);

export const getLists = async (boardId: string) =>
  apiClient.get(`/boards/${boardId}/lists`);

export const createList = async (boardId: string, name: string) =>
  apiClient.post("/lists", { name, idBoard: boardId });

export const deleteList = async (listId: string) =>
  apiClient.delete(`/lists/${listId}`);

export const getCards = async (listId: string) =>
  apiClient.get(`/lists/${listId}/cards`);

export const createCard = async (listId: string, name: string, desc?: string) =>
  apiClient.post(`/cards`, { idList: listId, name, desc });

export const updateCard = async (
  cardId: string,
  updates: Record<string, any>
) => apiClient.put(`/cards/${cardId}`, updates);

export const deleteCard = async (cardId: string) =>
  apiClient.delete(`/cards/${cardId}`);
