// Thunk for fetching data
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getDataSuccess, getStarted } from '..'
import { apiKey, baseApiUrl } from '@/contants'

interface FetchDataParams {
  roverName: string
  pageNumber: number
  cameraName: string
  earthDate: string
  solDate: number | string
  isQueryBySol: boolean
}

export const fetchDataThunk = createAsyncThunk(
  'photosData/fetchDataThunk',
  async (params: FetchDataParams, { dispatch }) => {
    const {
      roverName = 'curiosity',
      pageNumber = 1,
      cameraName,
      earthDate,
      solDate,
      isQueryBySol,
    } = params
    /* either sol or earth date, both can't be in the same call */
    const dateQuery = isQueryBySol
      ? `sol=${solDate}`
      : `earth_date=${earthDate}`
    /* if there is a camera selected to filter, then add query to the call */
    const cameraQuery = cameraName ? `&camera=${cameraName}` : ''
    const apiEndpoint = `${baseApiUrl}rovers/${roverName}/photos?${dateQuery}&page=${pageNumber}${cameraQuery}&api_key=${apiKey}`

    try {
      /* loading started */
      dispatch(getStarted())

      /* fetch data */
      const response = await axios.get(apiEndpoint)
      const photosData: object[] = response.data.photos

      /* save result data */
      dispatch(getDataSuccess(photosData))
    } catch (error) {
      throw Error('Error fetching data')
    }
  },
)
