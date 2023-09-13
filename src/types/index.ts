/* eslint-disable no-unused-vars */
export type CameraObjType = {
  full_name: string;
  id: number;
  name: string;
  rover_id: number;
};

export type PhotoObjType = {
  camera?: CameraObjType;
  earth_date?: string;
  id?: number;
  img_src?: string;
  rover?: object;
  sol?: number;
};

export type ContextObjType = {
  photosData: Array<object>;
  loadingState: boolean;
  currentEarthDate: string;
  pageNumber: number;
  cameraName: string;
  earthDate: string;
  solDate: number;
  roverName: string;
  isQueryBySol: boolean;
  setPageNumber: (arg0: number) => void;
  setCameraName: (arg0: string) => void;
  setEarthDate: (arg0: string) => void;
  setSolDate: (arg0: number) => void;
  setRoverName: (arg0: string) => void;
  setIsQueryBySol: (arg0: boolean) => void;
};
