'use string'
import { Stack, Button } from '@chakra-ui/react'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { SET_PAGE_NUMBER } from '@/redux/slices/photosData/types'

export default function PaginationButtons() {
  const dispatch = useAppDispatch()
  const photosData = useAppSelector((state) => state.photosData.value)
  const pageNumber = useAppSelector((state) => state.photosData.pageNumber)
  return (
    <Stack
      justifyContent={'center'}
      direction="row"
      spacing={4}
      align="center"
      my={6}
      data-testid="pagination-container"
    >
      {pageNumber > 1 ? (
        <Button
          colorScheme={'orange'}
          variant="outline"
          maxW={48}
          w={'full'}
          onClick={() =>
            dispatch({
              type: SET_PAGE_NUMBER,
              payload: pageNumber - 1,
            })
          }
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
          onClick={() =>
            dispatch({
              type: SET_PAGE_NUMBER,
              payload: pageNumber + 1,
            })
          }
          size={{ base: 'md', xl: 'lg' }}
        >
          Next Page
        </Button>
      ) : null}
    </Stack>
  )
}
