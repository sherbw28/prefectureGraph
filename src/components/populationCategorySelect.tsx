import { Select } from '@chakra-ui/react';

type PopulationCategorySelectProps = {
  selectedPopulationCategory: number;
  setSelectedPopulationCategory: React.Dispatch<React.SetStateAction<number>>;
};

const PopulationCategorySelect: React.FC<PopulationCategorySelectProps> = ({
  selectedPopulationCategory,
  setSelectedPopulationCategory,
}) => {
  return (
    <Select value={selectedPopulationCategory} onChange={(e) => setSelectedPopulationCategory(Number(e.target.value))}>
      <option value={0}>総人口</option>
      <option value={1}>年少人口</option>
      <option value={2}>生産年齢人口</option>
      <option value={3}>老年人口</option>
    </Select>
  );
};

export default PopulationCategorySelect;
