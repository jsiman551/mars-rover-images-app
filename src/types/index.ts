/* eslint-disable no-unused-vars */
export type CameraObjType = {
  full_name: string
  id: number
  name: string
  rover_id: number
}

export type PhotoObjType = {
  camera?: CameraObjType
  earth_date?: string
  id?: number
  img_src?: string
  rover?: object
  sol?: number
}
