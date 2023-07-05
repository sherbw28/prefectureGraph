// ./src/functions/getPeopleData.ts

import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_RESAS_API_KEY;

export const getPopulationData = async (prefCode: number) => {
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

  return response.data.result;
};

export const getPrefectures = async () => {
  const response = await axios.get(`https://opendata.resas-portal.go.jp/api/v1/prefectures`, {
    headers: {
      'X-API-KEY': API_KEY,
    },
  });

  return response.data.result;
};

export const makeRandomColor = (): string => {
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
};
