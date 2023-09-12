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
  Input
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
  setEarthDate: (arg0: string) => void
  earthDate: string
}

export default function SidebarFilters({
  isOpen,
  onClose,
  btnRef,
  setCameraName,
  cameraName,
  roverName,
  setEarthDate,
  earthDate
}: Props) {
  const [curiosity, opportunity, spirit] = roversNames;
  const cameraSelectorRef = useRef<any>();
  const earthDateRef = useRef<any>();
  const [camerasList, setCamerasList] = useState<Array<string>>([]);
  /* current earth date */
  const currentEarthDate = moment(new Date()).format("yyyy-MM-DD")

  /* apply filters function */
  const applyFilters = () => {
    /* filter by camera */
    if (cameraSelectorRef.current.value) {
      setCameraName(cameraSelectorRef.current.value);
    }
    if(earthDateRef.current.value) {
      setEarthDate(earthDateRef.current.value)
    }
  };

  /* clear filters */
  const clearFilters = () => {
    /* camera name back to empty string */
    setCameraName("")
    /* set earth date tu current date */
    setEarthDate(currentEarthDate)
  }

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
            <Text mb={1}>
              Cameras List for {roverName}
            </Text>
            <Select defaultValue={cameraName} ref={cameraSelectorRef}>
                <option value={""}>
                  Select a camera
                </option>
              {camerasList?.map((camera, cameraIndex) => (
                <option key={cameraIndex} value={camera}>
                  {camera}
                </option>
              ))}
            </Select>
          </Box>
          <Box mt={3}>
            <Text mb={1}>
              {`Earth Date: ${earthDate}`}
            </Text>
            <Input
              size="md"
              type="date"
              ref={earthDateRef}
            />
          </Box>
        </DrawerBody>

        <DrawerFooter>
        <Button
            colorScheme="red"
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
