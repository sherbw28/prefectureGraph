import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label, Legend } from 'recharts';

import { SelectedPrefectureData } from '@/types/index';

const COLOR_LIST = ['#FF0000', '#0000FF', '#00FF00', '#000000', '#800080', '#FFFF00'];

type LineChartPopulationProps = {
  selectedPrefecturesData: SelectedPrefectureData;
  //any考え中
  generateChartData: () => any[];
};

const LineChartPopulation: React.FC<LineChartPopulationProps> = ({ selectedPrefecturesData, generateChartData }) => {

  return (
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
  );
};

export default LineChartPopulation;
