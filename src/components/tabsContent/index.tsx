'use client'
import { ReactNode, useRef, Fragment, useEffect } from 'react'
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  Grid,
  Button,
  useDisclosure,
  Flex,
  Text,
} from '@chakra-ui/react'
import { roversNames } from '@/contants'
import Loading from '../loading'
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter'
import PaginationButtons from '../paginationButtons'
import SidebarFilters from '../sidebarFilters'
import { PhotoObjType } from '@/types'
import PhotoElement from '../photoElement'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { fetchDataThunk } from '@/redux/slices/photosData/api'
import { useAppSelector } from '@/hooks/useAppSelector'
import { SET_PAGE_NUMBER } from '@/redux/slices/photosData/types'
import {
  SET_CAMERA_NAME,
  SET_EARTH_DATE,
  SET_IS_QUERY_BY_SOL,
  SET_ROVER_NAME,
  SET_SOL_DATE,
} from '@/redux/slices/filteringParams/types'

export default function TabsContent() {
  const dispatch = useAppDispatch()
  const photosData = useAppSelector((state) => state.photosData.value)
  const loadingState = useAppSelector((state) => state.photosData.loading)
  const pageNumber = useAppSelector((state) => state.photosData.pageNumber)
  const cameraName = useAppSelector((state) => state.filteringParams.cameraName)
  const roverName = useAppSelector((state) => state.filteringParams.roverName)
  const isQueryBySol = useAppSelector(
    (state) => state.filteringParams.isQueryBySol,
  )
  const earthDate = useAppSelector((state) => state.filteringParams.earthDate)
  const solDate = useAppSelector((state) => state.filteringParams.solDate)
  /* filter action */
  const openFiltersRef = useRef<HTMLButtonElement>(null)
  /* sidebar filters  states */
  const { isOpen, onOpen, onClose } = useDisclosure()

  /* handle tabs change */
  const handleTabsChange = (index: number): void => {
    /* set numberPage to 1 each time the user changes tab */
    dispatch({
      type: SET_PAGE_NUMBER,
      payload: 1,
    })
    roversNames.forEach((name: string, i: number) => {
      if (index === i) {
        dispatch({
          type: SET_ROVER_NAME,
          payload: name,
        })
      }
    })
    /* set cameraName back to empty string */
    dispatch({
      type: SET_CAMERA_NAME,
      payload: '',
    })
    /* set earth date back to current date */
    dispatch({
      type: SET_EARTH_DATE,
      payload: '2015-6-3',
    })
    /* set sol date back to 1000 */
    dispatch({
      type: SET_SOL_DATE,
      payload: 1000,
    })
    /* set flag to switch dates back to earth date */
    dispatch({
      type: SET_IS_QUERY_BY_SOL,
      payload: false,
    })
  }

  useEffect(() => {
    const getPhotosData = () => {
      dispatch(
        fetchDataThunk({
          roverName,
          pageNumber,
          cameraName,
          earthDate,
          solDate,
          isQueryBySol,
        }),
      )
    }
    getPhotosData()
  }, [roverName, pageNumber, cameraName, earthDate, solDate])

  return (
    <>
      <Heading mb={4} textAlign={'center'}>
        Mars Rover Photos
      </Heading>
      <Tabs
        data-testid="tabs-container"
        isFitted
        variant="soft-rounded"
        onChange={handleTabsChange}
      >
        <TabList mb="1em">
          {roversNames.map((name: string, i: number): ReactNode => {
            return <Tab key={i}>{capitalizeFirstLetter(name)}</Tab>
          })}
        </TabList>
        <TabPanels>
          {roversNames.map((roverName: string, i: number): ReactNode => {
            return (
              <TabPanel key={i}>
                <Flex
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  px={{ md: 24 }}
                  pt={6}
                  pb={12}
                >
                  <Button
                    ref={openFiltersRef}
                    colorScheme="blue"
                    onClick={onOpen}
                    variant="outline"
                    size={{ base: 'md', xl: 'lg' }}
                  >
                    Open Filters
                  </Button>
                  <Heading>{`Page: ${pageNumber}`}</Heading>
                </Flex>
                {loadingState ? (
                  <Loading />
                ) : (
                  <>
                    {photosData.length > 0 ? (
                      <Grid
                        templateColumns={{
                          base: 'repeat(1, 1fr)',
                          md: 'repeat(3, 1fr)',
                          xl: 'repeat(4, 1fr)',
                          '2xl': 'repeat(5, 1fr)',
                        }}
                        gap={{ base: 3, xl: 2 }}
                      >
                        {photosData.map(
                          (
                            photo: PhotoObjType,
                            photoIndex: number,
                          ): ReactNode => {
                            return (
                              <Fragment key={photoIndex}>
                                <PhotoElement
                                  roverName={roverName}
                                  photoData={photo}
                                />
                              </Fragment>
                            )
                          },
                        )}
                      </Grid>
                    ) : (
                      <Text fontSize={'lg'} textAlign={'center'}>
                        There are no elements that match current filter
                        conditions
                      </Text>
                    )}
                    <PaginationButtons />
                  </>
                )}
              </TabPanel>
            )
          })}
        </TabPanels>
      </Tabs>
      <SidebarFilters
        isOpen={isOpen}
        onClose={onClose}
        btnRef={openFiltersRef}
      />
    </>
  )
}
