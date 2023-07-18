export interface Prefecture {
  prefCode: number;
  prefName: string;
}

export interface PopulationValueByYear {
  year: number;
  value: number;
}

export interface PopulationDatum {
  label: string;
  data: PopulationValueByYear[] | null;
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
