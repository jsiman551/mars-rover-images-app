import { RefObject, useEffect, useRef, useState } from 'react';
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Select,
  Box,
  Text,
  Input,
  FormLabel,
  Switch,
  Divider,
} from '@chakra-ui/react';
import {
  curiosityCameras,
  opportunityCameras,
  spiritCameras,
  roversNames,
} from '@/contants';
import moment from 'moment';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  btnRef: RefObject<HTMLInputElement>;
  // eslint-disable-next-line no-unused-vars
  setCameraName: (arg0: string) => void;
  photosData: Array<object>;
  cameraName: string;
  roverName: string;
  // eslint-disable-next-line no-unused-vars
  setEarthDate: (arg0: string) => void;
  earthDate: string;
  // eslint-disable-next-line no-unused-vars
  setSolDate: (arg0: number) => void;
  // eslint-disable-next-line no-unused-vars
  setIsQueryBySol: (arg0: boolean) => void;
  isQueryBySol: boolean;
  solDate: number;
}

export default function SidebarFilters({
  isOpen,
  onClose,
  btnRef,
  setCameraName,
  cameraName,
  roverName,
  setEarthDate,
  earthDate,
  setSolDate,
  setIsQueryBySol,
  isQueryBySol,
  solDate,
}: Props) {
  const [curiosity, opportunity, spirit] = roversNames;
  const cameraSelectorRef = useRef<any>();
  const earthDateRef = useRef<any>();
  const solDateRef = useRef<any>();
  const [camerasList, setCamerasList] = useState<Array<string>>([]);
  /* current earth date */
  const currentEarthDate = moment(new Date()).format('yyyy-MM-DD');

  /* apply filters function */
  const applyFilters = (): void => {
    /* filter by camera */
    if (cameraSelectorRef.current?.value) {
      setCameraName(cameraSelectorRef.current.value);
    }
    /* filter by earth date */
    if (earthDateRef.current?.value) {
      setEarthDate(earthDateRef.current.value);
    }
    /* filter by sol date */
    if (solDateRef.current?.value) {
      setSolDate(solDateRef.current.value);
    }
  };

  /* clear filters */
  const clearFilters = (): void => {
    /* camera name back to empty string */
    setCameraName('');
    /* set earth date back to current date */
    setEarthDate(currentEarthDate);
    /* set sol date back to 1000 */
    setSolDate(1000);
    /* set flag to switch dates back to earth date */
    setIsQueryBySol(false);
  };

  /* set the cameras list for selector */
  useEffect(() => {
    if (roverName === spirit) {
      setCamerasList(spiritCameras);
    } else if (roverName === opportunity) {
      setCamerasList(opportunityCameras);
    } else if (roverName === curiosity) {
      setCamerasList(curiosityCameras);
    }
  }, [roverName]);

  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={btnRef}
      size={'md'}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Filters</DrawerHeader>

        <DrawerBody>
          <Box>
            <FormLabel htmlFor="soldDateSwitch">Switch Dates?</FormLabel>
            <Switch
              id="soldDateSwitch"
              onChange={() => setIsQueryBySol(!isQueryBySol)}
            />
          </Box>
          <Divider my={4} />
          <Box>
            <Text mb={1}>Cameras List for {roverName}</Text>
            <Select defaultValue={cameraName} ref={cameraSelectorRef}>
              <option value={''}>Select a camera</option>
              {camerasList?.map((camera, cameraIndex) => (
                <option key={cameraIndex} value={camera}>
                  {camera}
                </option>
              ))}
            </Select>
          </Box>
          {!isQueryBySol ? (
            <Box mt={3}>
              <Text mb={1}>Earth Date:</Text>
              <Input
                size="md"
                type="date"
                ref={earthDateRef}
                defaultValue={earthDate}
              />
            </Box>
          ) : (
            <Box mt={3}>
              <Text mb={1}>Sol Date:</Text>
              <Input
                size="md"
                type="number"
                ref={solDateRef}
                defaultValue={solDate}
              />
            </Box>
          )}
        </DrawerBody>

        <DrawerFooter>
          <Button
            colorScheme="yellow"
            onClick={() => {
              clearFilters();
              onClose();
            }}
            mr={2}
          >
            Clear Filters
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              applyFilters();
              onClose();
            }}
          >
            Apply
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
