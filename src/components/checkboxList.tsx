import { Checkbox, Grid } from '@chakra-ui/react';

import { SelectedPrefectureData } from '@/types/index';

type CheckboxListProps = {
  prefectures: { prefCode: number; prefName: string }[];
  selectedPrefecturesData: SelectedPrefectureData;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>, prefCode: number, prefName: string) => void;
};

const CheckboxList: React.FC<CheckboxListProps> = ({ prefectures, selectedPrefecturesData, handleCheckboxChange }) => {
  return (
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
  );
};

export default CheckboxList;
