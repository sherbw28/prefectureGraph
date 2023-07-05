export interface Prefecture {
  prefCode: number;
  prefName: string;
}

export interface PopulationDatum {
  year: number;
  value: number;
}

export interface PopulationData {
  boundaryYear: number;
  data: PopulationDatum[];
}

export interface PrefectureData {
  name: string;
  data: PopulationDatum[] | null;
}

export interface SelectedPrefectureData {
  [prefCode: string]: PrefectureData;
}
