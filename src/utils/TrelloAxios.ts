import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_TRELLO_BASE_URL,
  params: {
    key: import.meta.env.VITE_TRELLO_API_KEY,
    token: import.meta.env.VITE_TRELLO_API_SECRET,
  },
});

export const getBoards = async () => apiClient.get('/members/me/boards');
export const getBoardDetails = async (id: string) => apiClient.get(`/boards/${id}`);