import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_RESAS_API_KEY;

export const getPopulationData = async (prefCode: number) => {
  // これheadersとかbaseのurlとかをwrapper関数作っちゃって指定したほうがいいかも
  // APIの数が増えてくると毎度定義するの大変だから
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

export interface Prefecture {
  prefCode: number;
  prefName: string;
}

interface PopulationValueByYear {
  year: number;
  value: number;
}

interface PopulationDatum {
  label: string;
  data: PopulationValueByYear[];
}

export interface PopulationData {
  boundaryYear: number;
  data: PopulationDatum[];
}

export interface PrefectureData {
  name: string;
  data: PopulationDatum[];
}

export interface SelectedPrefectureData {
  [prefCode: string]: PrefectureData;
}

export type YearlyPopulationData = {
  [prefName: string]: number;
};
