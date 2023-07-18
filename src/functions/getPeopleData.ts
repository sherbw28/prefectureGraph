import axios from 'axios';

import { Prefecture, PopulationData } from '@/types/index';

const API_KEY = process.env.NEXT_PUBLIC_RESAS_API_KEY;

export const getPopulationData = async (prefCode: number): Promise<PopulationData> => {
  const response = await axios.get(
    `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-`,
    {
      headers: {
        'X-API-KEY': API_KEY,
      },
      params: {
        prefCode,
      },
    },
  );

  return (response.data as { result: PopulationData }).result;
};

export const getPrefectures = async (): Promise<Prefecture[]> => {
  const response = await axios.get(`https://opendata.resas-portal.go.jp/api/v1/prefectures`, {
    headers: {
      'X-API-KEY': API_KEY,
    },
  });

  return (response.data as { result: Prefecture[] }).result;
};
