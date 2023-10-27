import { RefObject, useEffect, useRef, useState } from 'react'
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
} from '@chakra-ui/react'
import {
  curiosityCameras,
  opportunityCameras,
  spiritCameras,
  roversNames,
} from '@/contants'
import { SET_PAGE_NUMBER } from '@/redux/slices/photosData/types'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import {
  SET_CAMERA_NAME,
  SET_EARTH_DATE,
  SET_IS_QUERY_BY_SOL,
  SET_SOL_DATE,
} from '@/redux/slices/filteringParams/types'

interface Props {
  isOpen: boolean
  onClose: () => void
  btnRef: RefObject<HTMLButtonElement>
}

export default function SidebarFilters({ isOpen, onClose, btnRef }: Props) {
  const dispatch = useAppDispatch()
  const cameraName = useAppSelector((state) => state.filteringParams.cameraName)
  const roverName = useAppSelector((state) => state.filteringParams.roverName)
  const isQueryBySol = useAppSelector(
    (state) => state.filteringParams.isQueryBySol,
  )
  const earthDate = useAppSelector((state) => state.filteringParams.earthDate)
  const solDate = useAppSelector((state) => state.filteringParams.solDate)
  const [curiosity, opportunity, spirit] = roversNames
  const cameraSelectorRef = useRef<HTMLSelectElement>(null)
  const earthDateRef = useRef<HTMLInputElement>(null)
  const solDateRef = useRef<HTMLInputElement>(null)
  const [camerasList, setCamerasList] = useState<Array<string>>([])

  /* apply filters function */
  const applyFilters = (): void => {
    /* filter by camera */
    if (cameraSelectorRef.current?.value) {
      dispatch({
        type: SET_CAMERA_NAME,
        payload: cameraSelectorRef.current.value,
      })
    }
    /* filter by earth date */
    if (earthDateRef.current?.value) {
      dispatch({
        type: SET_EARTH_DATE,
        payload: earthDateRef.current.value,
      })
    }
    /* filter by sol date */
    if (solDateRef.current?.value) {
      dispatch({
        type: SET_SOL_DATE,
        payload: solDateRef.current.value,
      })
    }
  }

  /* clear filters */
  const clearFilters = (): void => {
    /* camera name back to empty string */
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
    /* set page number back to 1 */
    dispatch({
      type: SET_PAGE_NUMBER,
      payload: 1,
    })
  }

  /* set the cameras list for selector */
  useEffect(() => {
    if (roverName === spirit) {
      setCamerasList(spiritCameras)
    } else if (roverName === opportunity) {
      setCamerasList(opportunityCameras)
    } else if (roverName === curiosity) {
      setCamerasList(curiosityCameras)
    }
  }, [roverName])

  return (
    <Box data-testid="sidebar-container">
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
                onChange={() =>
                  dispatch({
                    type: SET_IS_QUERY_BY_SOL,
                    payload: !isQueryBySol,
                  })
                }
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
                clearFilters()
                onClose()
              }}
              mr={2}
            >
              Clear Filters
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                applyFilters()
                onClose()
              }}
            >
              Apply
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
