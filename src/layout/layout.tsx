import { VStack, Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  const { children } = props;

  return (
    <VStack w="100vw" h="100vh" bg="bg.body" spacing="0px">
      <Heading m={5}>都道府県グラフ</Heading>
      {children}
    </VStack>
  );
};

export default Layout;
