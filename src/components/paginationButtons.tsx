'use string';
import { useContext } from 'react';
import { ThemeContext } from '@/app/page';
import { ContextObjType } from '@/types';
import { Stack, Button } from '@chakra-ui/react';

export default function PaginationButtons() {
  /* get context */
  const context = useContext<ContextObjType | any>(ThemeContext);
  const { photosData, pageNumber, setPageNumber } = context;
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
      {photosData.length === 25 ? (
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
    </Stack>
  );
}
