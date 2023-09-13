'use client';
import { ReactNode, useRef, Fragment, useContext } from 'react';
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
} from '@chakra-ui/react';
import { roversNames } from '@/contants';
import Loading from '../loading';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import PaginationButtons from '../paginationButtons';
import SidebarFilters from '../sidebarFilters';
import { ContextObjType, PhotoObjType } from '@/types';
import PhotoElement from '../photoElement';
import { ThemeContext } from '@/app/page';

export default function TabsContent() {
  /* get context */
  const context = useContext<ContextObjType>(ThemeContext);
  const {
    photosData,
    loadingState,
    currentEarthDate,
    pageNumber,
    setPageNumber,
    setCameraName,
    setEarthDate,
    setSolDate,
    setRoverName,
    setIsQueryBySol,
  } = context;
  /* filter action */
  const openFiltersRef = useRef<HTMLButtonElement>(null);
  /* sidebar filters  states */
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    /* set earth date back to current date */
    setEarthDate(currentEarthDate);
    /* set sol date back to 1000 */
    setSolDate(1000);
    /* set flag to switch dates back to earth date */
    setIsQueryBySol(false);
  };

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
                    <PaginationButtons />
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
      />
    </>
  );
}
