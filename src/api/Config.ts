import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://swapi.dev/api',
});

export const api = {
  get(url: string) {
    return axiosInstance.get(url);
  },
};
