import { Stack, Select } from '@chakra-ui/react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label, Legend } from 'recharts';
import { useEffect, useState } from 'react';

import { Prefecture, SelectedPrefectureData, YearlyPopulationData } from '@/types/index';
import { getPopulationData, getPrefectures } from '@/functions/getPeopleData';
import { CheckboxList } from '@/components';
import Layout from '@/layout/layout';

const IndexPage = (): JSX.Element => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefecturesData, setSelectedPrefecturesData] = useState<SelectedPrefectureData>({});
  const [selectedPopulationCategory, setSelectedPopulationCategory] = useState(0);

  const COLOR_LIST = ['#FF0000', '#0000FF', '#00FF00', '#000000', '#800080', '#FFFF00'];

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
        <Select
          value={selectedPopulationCategory}
          onChange={(e) => setSelectedPopulationCategory(Number(e.target.value))}
        >
          <option value={0}>総人口</option>
          <option value={1}>年少人口</option>
          <option value={2}>生産年齢人口</option>
          <option value={3}>老年人口</option>
        </Select>
        <CheckboxList
          prefectures={prefectures}
          selectedPrefecturesData={selectedPrefecturesData}
          handleCheckboxChange={handleCheckboxChange}
        />
        <LineChart
          width={800}
          height={400}
          data={generateChartData()}
          margin={{ top: 10, right: 10, left: 80, bottom: 80 }}
        >
          {Object.entries(selectedPrefecturesData).map(([prefCode, { name }], index) => (
            <Line type="monotone" dataKey={name} stroke={COLOR_LIST[index % COLOR_LIST.length]} key={prefCode} />
          ))}
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="year">
            <Label value="年" offset={-20} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="人口" angle={-90} position="insideLeft" offset={-50} />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
        </LineChart>
      </Stack>
    </Layout>
  );
};

export default IndexPage;
