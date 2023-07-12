// /utils/api/index.ts
import axios from 'axios';

import { Prefecture, PopulationData } from '../../functions/getPeopleData';

// RESAS API key
const API_KEY = process.env.NEXT_PUBLIC_RESAS_API_KEY;
// const API_KEY = "https://opendata.resas-portal.go.jp/api/v1/prefectures";

// RESAS API URL
const API_URL = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';

// Configure axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'X-API-KEY': API_KEY,
  },
});

// Get prefectures function
export const getPrefectures = async (): Promise<Prefecture[] | null> => {
  try {
    const response = await api.get('/prefectures');
    return (response.data as { result: Prefecture[] }).result;
  } catch (error) {
    return null;
  }
};

// Get population function
export const getPopulation = async (prefCode: number): Promise<PopulationData | null> => {
  try {
    const response = await api.get(`/population/composition/perYear?prefCode=${prefCode}&cityCode=-`);
    return (response.data as { result: PopulationData }).result;
  } catch (error) {
    return null;
  }
};
