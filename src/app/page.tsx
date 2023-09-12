'use client';
import { useState, useEffect, createContext } from 'react';
import moment from 'moment';
import { getPhotos } from '@/api/apiCall';
import DarkModeSwitch from '@/components/darkModeSwitch';
import TabsContent from '@/components/tabsContent';
import { Box } from '@chakra-ui/react';
import { roversNames } from '@/contants';
import { ContextObjType } from '@/types';

/* lets define a context to handle data globally */
export const ThemeContext = createContext(null);

export default function Home() {
  const [curiosity] = roversNames;
  /* current earth date */
  const currentEarthDate = moment(new Date()).format('yyyy-MM-DD');
  /* loading state, data won't render until is fully fetched */
  const [loadingState, setLoadingState] = useState<boolean>(true);
  /* all photos data */
  const [photosData, setPhotosData] = useState<Array<object>>([]);
  /* pagination number */
  const [pageNumber, setPageNumber] = useState<number>(1);
  /* camera name */
  const [cameraName, setCameraName] = useState<string>('');
  /* earth date number */
  const [earthDate, setEarthDate] = useState<string>(currentEarthDate);
  /* sol date number */
  const [solDate, setSolDate] = useState<number>(1000);
  const [roverName, setRoverName] = useState<string>(curiosity);
  /* flag to indicate which date is going to the call, either sol date or earth date */
  /* current earth date by default, to show latest photos for today */
  const [isQueryBySol, setIsQueryBySol] = useState<boolean>(false);
  /* context provider */
  const { Provider } = ThemeContext;

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
        isQueryBySol,
      );
      if (apiResponde) {
        setPhotosData(apiResponde);
        /* set loading state to false, so photos can be rendered */
        setLoadingState(false);
      }
    };
    getPhotosData();
  }, [roverName, pageNumber, cameraName, earthDate, solDate]);

  const contextData: ContextObjType | any = {
    photosData: photosData,
    loadingState: loadingState,
    currentEarthDate: currentEarthDate,
    pageNumber: pageNumber,
    cameraName: cameraName,
    earthDate: earthDate,
    solDate: solDate,
    roverName: roverName,
    isQueryBySol: isQueryBySol,
    setPageNumber: setPageNumber,
    setCameraName: setCameraName,
    setEarthDate: setEarthDate,
    setSolDate: setSolDate,
    setRoverName: setRoverName,
    setIsQueryBySol: setIsQueryBySol,
  };

  return (
    <Provider value={contextData}>
      <main>
        <Box p={4}>
          <DarkModeSwitch />
          <TabsContent />
        </Box>
      </main>
    </Provider>
  );
}
