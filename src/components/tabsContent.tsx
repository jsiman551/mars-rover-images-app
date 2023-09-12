'use client';
import { useState, useEffect, ReactNode, useRef } from 'react';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  Grid,
  GridItem,
  Image,
  Button,
  useDisclosure,
  Flex,
  Text,
} from '@chakra-ui/react';
import { getPhotos } from '@/api/apiCall';
import { roversNames } from '@/contants';
import Loading from './loading';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import PaginationButtons from './paginationButtons';
import SidebarFilters from './sidebarFilters';
import moment from 'moment';

export default function TabsContent() {
  const [curiosity] = roversNames;
  const openFiltersRef = useRef<any>();
  /* current earth date */
  const currentEarthDate = moment(new Date()).format("yyyy-MM-DD")
  /* sidebar filters  states */
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [roverName, setRoverName] = useState<string>(curiosity);
  /* loading state, data won't render until is fully fetched */
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [photosData, setPhotosData] = useState<Array<object>>([]);
  /* pagination number */
  const [pageNumber, setPageNumber] = useState<number>(1);
  /* camera name */
  const [cameraName, setCameraName] = useState<string>('');
  /* earth date number */
  const [earthDate, setEarthDate] = useState<string>(currentEarthDate);
  /* sol date number */
  const [solDate, setSolDate] = useState<number>(1000);
  /* flag to indicate which date is going to the call, either sol date or earth date */
  /* current earth date by default, to show latest photos for today */
  const [isQueryBySol, isIsQueryBySol] = useState<boolean>(false);

  /* handle tabs change */
  const handleTabsChange = (index: number): void => {
    /* set numberPage to 1 each time the user changes tab */
    setPageNumber(1);
    roversNames.forEach((name: string, i: number) => {
      if (index === i) {
        setRoverName(name);
      }
    });
    /* set cameraName back to empty string */
    setCameraName('');
  };

  /* call rover photos */
  useEffect(() => {
    const getPhotosData = async () => {
      /* set loading state to true for new calls */
      setLoadingState(true);
      const apiResponde = await getPhotos(
        roverName, 
        pageNumber, 
        cameraName, 
        earthDate,
        solDate,
        isQueryBySol
        );
      if (apiResponde) {
        setPhotosData(apiResponde);
        /* set loading state to false, so photos can be rendered */
        setLoadingState(false);
      }
    };
    getPhotosData();
  }, [roverName, pageNumber, cameraName, earthDate]);

  console.log(photosData);

  return (
    <>
      <Heading mb={4} textAlign={'center'}>
        Mars Rover Photos
      </Heading>
      <Tabs isFitted variant="enclosed" onChange={handleTabsChange}>
        <TabList mb="1em">
          {roversNames.map((name: string, i: number): ReactNode => {
            return <Tab key={i}>{capitalizeFirstLetter(name)}</Tab>;
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
                    Apply Filters
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
                          base: 'repeat(2, 1fr)',
                          md: 'repeat(3, 1fr)',
                          xl: 'repeat(4, 1fr)',
                        }}
                        gap={{ base: 3, xl: 2 }}
                      >
                        {photosData.map(
                          (item: any, itemIndex: number): ReactNode => {
                            return (
                              <GridItem w="100%" bg="gray.100" key={itemIndex}>
                                <Image src={item.img_src} alt={roverName} />
                              </GridItem>
                            );
                          },
                        )}
                      </Grid>
                    ) : (
                      <Text fontSize={'lg'} textAlign={'center'}>
                        There are no elements that match current filter
                        conditions
                      </Text>
                    )}
                    <PaginationButtons
                      pageNumber={pageNumber}
                      setPageNumber={setPageNumber}
                      dataLength={photosData.length}
                    />
                  </>
                )}
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
      <SidebarFilters
        isOpen={isOpen}
        onClose={onClose}
        btnRef={openFiltersRef}
        setCameraName={setCameraName}
        cameraName={cameraName}
        photosData={photosData}
        roverName={roverName}
        setEarthDate={setEarthDate}
        earthDate={earthDate}
      />
    </>
  );
}
