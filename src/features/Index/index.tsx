import { Center, Text, Checkbox, CheckboxGroup, VStack } from '@chakra-ui/react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useEffect, useState } from 'react';
import {
  Prefecture,
  PopulationData,
  PopulationDatum,
  getPopulationData,
  getPrefectures,
} from '@/functions/getPeopleData';
import Layout from '@/layout/layout';

const IndexPage = (): JSX.Element => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]);
  const [populationData, setPopulationData] = useState<PopulationDatum[] | null>(null);

  useEffect(() => {
    const fetchPrefectures = async () => {
      const data = await getPrefectures();
      setPrefectures(data);
    };

    fetchPrefectures();
  }, []);

  useEffect(() => {
    const fetchPopulationData = async () => {
      if (selectedPrefectures.length > 0) {
        const data = await getPopulationData(selectedPrefectures[0]);
        setPopulationData(data.data[0].data);
      } else {
        setPopulationData(null);
      }
    };

    fetchPopulationData();
  }, [selectedPrefectures]);
  return (
    <Layout>
      <VStack spacing={4} align="start">
        {prefectures.map((pref) => (
          <Checkbox
            key={pref.prefCode}
            value={pref.prefCode}
            isChecked={selectedPrefectures.includes(pref.prefCode)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedPrefectures([...selectedPrefectures, pref.prefCode]);
              } else {
                setSelectedPrefectures(selectedPrefectures.filter((code) => code !== pref.prefCode));
              }
            }}
          >
            {pref.prefName}
          </Checkbox>
        ))}
      </VStack>
      {populationData && (
        <LineChart width={500} height={300} data={populationData}>
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
        </LineChart>
      )}
    </Layout>
  );
};

export default IndexPage;
