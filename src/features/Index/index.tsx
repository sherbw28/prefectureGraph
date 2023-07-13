import { Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { Prefecture, SelectedPrefectureData, YearlyPopulationData } from '@/types/index';
import { getPopulationData, getPrefectures } from '@/functions/getPeopleData';
import { CheckboxList, PopulationCategorySelect, LineChartPopulation } from '@/components';
import Layout from '@/layout/layout';

const IndexPage = (): JSX.Element => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefecturesData, setSelectedPrefecturesData] = useState<SelectedPrefectureData>({});
  const [selectedPopulationCategory, setSelectedPopulationCategory] = useState(0);

  useEffect(() => {
    const fetchPrefectures = async () => {
      const data = await getPrefectures();
      setPrefectures(data);
    };

    void fetchPrefectures();
  }, []);

  //選択された都道府県の人口データを取得
  useEffect(() => {
    const fetchPopulationData = async (prefCode: number, prefName: string) => {
      const data = await getPopulationData(prefCode);

      setSelectedPrefecturesData((prevData) => ({
        ...prevData,
        [prefCode]: { name: prefName, data: data.data },
      }));
    };

    for (const prefCode in selectedPrefecturesData) {
      if (selectedPrefecturesData[prefCode].data === null) {
        void fetchPopulationData(Number(prefCode), selectedPrefecturesData[prefCode].name);
      }
    }
  }, [selectedPrefecturesData, selectedPopulationCategory]);

  //チェックボックスの選択の確認
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, prefCode: number, prefName: string) => {
    if (e.target.checked) {
      setSelectedPrefecturesData((prevData) => ({
        ...prevData,
        [prefCode]: { name: prefName, data: null },
      }));
    } else {
      setSelectedPrefecturesData((prevData) => {
        const newData = { ...prevData };
        delete newData[prefCode];
        return newData;
      });
    }
  };

  //チャートを表示する
  const generateChartData = () => {
    const mergedData: { [year: string]: YearlyPopulationData } = {};

    Object.values(selectedPrefecturesData).forEach(({ name, data }) => {
      // 選択されたカテゴリの切り替え
      const selectedData = data?.[selectedPopulationCategory]?.data;

      selectedData?.forEach(({ year, value }) => {
        if (!mergedData[year]) {
          mergedData[year] = { year: year, value: 0 };
        }
        mergedData[year][name] = value;
      });
    });

    return Object.values(mergedData);
  };

  return (
    <Layout>
      <Stack spacing="32px">
        <PopulationCategorySelect
          selectedPopulationCategory={selectedPopulationCategory}
          setSelectedPopulationCategory={setSelectedPopulationCategory}
        />
        <CheckboxList
          prefectures={prefectures}
          selectedPrefecturesData={selectedPrefecturesData}
          handleCheckboxChange={handleCheckboxChange}
        />
        <LineChartPopulation selectedPrefecturesData={selectedPrefecturesData} generateChartData={generateChartData} />
      </Stack>
    </Layout>
  );
};

export default IndexPage;
