import { useQuery } from 'react-query';
import { getBoardDetails } from '../utils/TrelloAxios'; 

export const useBoardDetails = (id: string) => {
  return useQuery(['boardDetails', id], () => getBoardDetails(id));
};
