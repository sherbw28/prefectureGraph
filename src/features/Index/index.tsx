import { Center, Checkbox, Grid, VStack } from '@chakra-ui/react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useEffect, useState } from 'react';
import {
  Prefecture,
  SelectedPrefectureData,
  PrefectureData,
  getPopulationData,
  getPrefectures,
  PopulationDatum,
  makeRandomColor
} from '@/functions/getPeopleData';
import Layout from '@/layout/layout';

const IndexPage = (): JSX.Element => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefecturesData, setSelectedPrefecturesData] = useState<SelectedPrefectureData>({});

  useEffect(() => {
    const fetchPrefectures = async () => {
      const data = await getPrefectures();
      setPrefectures(data);
    };

    fetchPrefectures();
  }, []);

  useEffect(() => {
    const fetchPopulationData = async (prefCode: number, prefName: string) => {
      const data = await getPopulationData(prefCode);

      setSelectedPrefecturesData((prevData) => ({
        ...prevData,
        [prefCode]: { name: prefName, data: data.data[0].data },
      }));
    };

    for (let prefCode in selectedPrefecturesData) {
      if (selectedPrefecturesData[prefCode].data === null) {
        fetchPopulationData(Number(prefCode), selectedPrefecturesData[prefCode].name);
      }
    }
  }, [selectedPrefecturesData]);

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

  const generateChartData = () => {
    let mergedData: { [year: string]: PopulationDatum & { [prefName: string]: number } } = {};

    Object.values(selectedPrefecturesData).forEach(({ name, data }) => {
      data?.forEach(({ year, value }) => {
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
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
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
      <LineChart width={500} height={300} data={generateChartData()}>
        {Object.entries(selectedPrefecturesData).map(([prefCode, { name, data }]) =>
          data ? <Line type="monotone" dataKey={name} stroke={makeRandomColor()} key={prefCode} /> : null,
        )}
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </Layout>
  );
};

export default IndexPage;
