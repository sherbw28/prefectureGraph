import { Center, Checkbox, Grid, Stack, VStack, Select } from '@chakra-ui/react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label, Legend } from 'recharts';
import { useEffect, useState } from 'react';
import {
  Prefecture,
  SelectedPrefectureData,
  getPopulationData,
  getPrefectures,
  YearlyPopulationData,
} from '@/functions/getPeopleData';
import Layout from '@/layout/layout';

const IndexPage = (): JSX.Element => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefecturesData, setSelectedPrefecturesData] = useState<SelectedPrefectureData>({});
  /**
   * selectedPrefecturesData -> { prefCode: number, PrefectureData}[]に変換する処理が2回あるから、これ定数でもっといた方がいいかも
   * const selectedPrefecturesDataList = Object.entries(selectedPrefecturesData).map(([prefCode, prefectureData]) => {
   *  return { prefCode, prefectureData }
   * })
   */
  

  const [selectedPopulationCategory, setSelectedPopulationCategory] = useState(0);
  // COLOR_LISTはレンダリングされる必要のない定数だからIndexPageコンポーネント外においた方がいいね
  const COLOR_LIST = ['#FF0000', '#0000FF', '#00FF00', '#000000', '#800080', '#FFFF00'];

  useEffect(() => {
    const fetchPrefectures = async () => {
      const data = await getPrefectures();
      setPrefectures(data);
    };

    fetchPrefectures();
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

    // このprefCodeは一回の処理内では変化しないからconst定義でいい気がする
    for (let prefCode in selectedPrefecturesData) {
      // selectedPrefecturesData[prefCode]が存在しない時はundefinedになる気がする。
      // つまりif(!selectedPrefecturesData[prefCode]?.data)この指定の方が正しい気がする
      if (selectedPrefecturesData[prefCode].data === null) {
        fetchPopulationData(Number(prefCode), selectedPrefecturesData[prefCode].name);
      }
    }
  }, [selectedPrefecturesData, selectedPopulationCategory]);

  //チェックボックスの選択の確認
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, prefCode: number, prefName: string) => {
    if (e.target.checked) {
      setSelectedPrefecturesData((prevData) => ({
        ...prevData,
        // ここdataにnull入れるなら、data: PopulationDatum[] | nullに変えた方がいいかも
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
    /**
     * [Knowledge]: 組み込み型Record
     * mergedData: Record<string, YearlyPopulationData>
     */
    let mergedData: { [year: string]: YearlyPopulationData } = {};

    Object.values(selectedPrefecturesData).forEach(({ name, data }) => {
      // 選択されたカテゴリの切り替え
      const selectedData = data?.[selectedPopulationCategory]?.data;

      selectedData?.forEach(({ year, value }) => {
        if (!mergedData[year]) {
          /**
         * [Knowledge]: keyとvalueの名称が同じ場合は省略できる
         * mergedData[year] = { year, value: 0 };
         */
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
        <Grid templateColumns="repeat(7, 1fr)" gap={5}>
          {prefectures.map((pref) => (
            <Checkbox
              key={pref.prefCode}
              isChecked={!!selectedPrefecturesData[pref.prefCode]}
              onChange={(e) => handleCheckboxChange(e, pref.prefCode, pref.prefName)}
            >
              {pref.prefName}
            </Checkbox>
          ))}
        </Grid>
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
