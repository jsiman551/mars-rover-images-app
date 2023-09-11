'use string';
import { Stack, Button, Text } from '@chakra-ui/react';

interface Props {
  pageNumber: number;
  setPageNumber: Function;
  dataLength: number;
}

export default function PaginationButtons({
  pageNumber,
  setPageNumber,
  dataLength,
}: Props) {
  return (
    <Stack
      justifyContent={'center'}
      direction="row"
      spacing={4}
      align="center"
      my={6}
    >
      {pageNumber > 1 ? (
        <Button
          colorScheme={'orange'}
          variant="outline"
          maxW={48}
          w={'full'}
          onClick={() => setPageNumber(pageNumber - 1)}
          size={{ base: 'md', xl: 'lg' }}
        >
          Previous Page
        </Button>
      ) : null}
      {dataLength === 25 ? (
        <Button
          colorScheme={'blue'}
          variant="outline"
          maxW={48}
          w={'full'}
          onClick={() => setPageNumber(pageNumber + 1)}
          size={{ base: 'md', xl: 'lg' }}
        >
          Next Page
        </Button>
      ) : null}
      <Text fontSize={'xl'} display={{ base: 'none', md: 'block' }}>
        {`Page: ${pageNumber}`}
      </Text>
    </Stack>
  );
}
