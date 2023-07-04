import { VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  const { children } = props;

  return (
    <VStack w="100vw" h="100vh" bg="bg.body" spacing="0px">
      {children}
    </VStack>
  );
};

export default Layout;
