import { SystemStyleObject } from '@chakra-ui/react';

export const scrollBarStyle: SystemStyleObject = {
  '&::-webkit-scrollbar': { width: '6px', height: '6px' },
  '&::-webkit-scrollbar-track': { bg: 'ui.white' },
  '&::-webkit-scrollbar-thumb': { bg: 'ui.lightgray' },
};
