import { api } from './Config';

export async function getStarWarCharacters(searchTerm: string, page: number) {
  const url = `/people?search=${searchTerm}&page=${page}`;
  return await api.get(url);
}
