/* DEMO KEY */
export const apiKey: string = 'vljSVBigYSHnn0rsIvQ34hnNnDOf3TOzxWKycAtB'

/* Base API URL */
export const baseApiUrl: string = 'https://api.nasa.gov/mars-photos/api/v1/'

/* Rovers Names */
export const roversNames: Array<string> = ['curiosity', 'opportunity', 'spirit']

/* cameras list for curiosity rover */
export const curiosityCameras: Array<string> = [
  'FHAZ',
  'RHAZ',
  'MAST',
  'CHEMCAM',
  'MAHLI',
  'MARDI',
  'NAVCAM',
]

/* cameras list for opportunity rover */
export const opportunityCameras: Array<string> = [
  'FHAZ',
  'RHAZ',
  'NAVCAM',
  'PANCAM',
  'MINITES',
]

/* cameras list for spirit rover */
export const spiritCameras: Array<string> = [
  'FHAZ',
  'RHAZ',
  'NAVCAM',
  'PANCAM',
  'MINITES',
]

/* test context mock */
export const contextDataMock = {
  photosData: [
    {
      camera: {
        full_name: 'full test name',
        id: 500,
        name: 'test name',
        rover_id: 500,
      },
      earth_date: '2020-02-02',
      id: 500,
      img_src: '',
      rover: {
        id: 5,
        name: 'Curiosity',
        landing_date: '2012-08-06',
        launch_date: '2011-11-26',
        status: 'active',
        max_sol: 3945,
        max_date: '2023-09-11',
        total_photos: 677816,
        cameras: [
          {
            name: 'FHAZ',
            full_name: 'Front Hazard Avoidance Camera',
          },
          {
            name: 'NAVCAM',
            full_name: 'Navigation Camera',
          },
          {
            name: 'MAST',
            full_name: 'Mast Camera',
          },
          {
            name: 'CHEMCAM',
            full_name: 'Chemistry and Camera Complex',
          },
          {
            name: 'MAHLI',
            full_name: 'Mars Hand Lens Imager',
          },
          {
            name: 'MARDI',
            full_name: 'Mars Descent Imager',
          },
          {
            name: 'RHAZ',
            full_name: 'Rear Hazard Avoidance Camera',
          },
        ],
      },
      sol: 1000,
    },
  ],
  loadingState: false,
  // currentEarthDate: '2020-02-02',
  pageNumber: 1,
  cameraName: 'test camera',
  earthDate: '2020-02-02',
  solDate: 1000,
  roverName: 'rover name test',
  isQueryBySol: false,
  setPageNumber: () => {},
  setCameraName: () => {},
  setEarthDate: () => {},
  setSolDate: () => {},
  setRoverName: () => {},
  setIsQueryBySol: () => {},
}
