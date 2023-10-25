import { apiKey, baseApiUrl } from '@/contants'
const axios = require('axios')

/* call photos */
export const getPhotos = async (
  roverName: string = 'curiosity',
  pageNumber: number = 1,
  cameraName: string,
  earthDate: string,
  solDate: number | string,
  isQueryBySol: boolean,
) => {
  /* either sol or earth date, both can't be in the same call */
  const dateQuery = isQueryBySol ? `sol=${solDate}` : `earth_date=${earthDate}`
  /* if there is a camera selected to filter, then add query to the call */
  const cameraQuery = cameraName ? `&camera=${cameraName}` : ''
  try {
    const response = await axios.get(
      `${baseApiUrl}rovers/${roverName}/photos?${dateQuery}&page=${pageNumber}${cameraQuery}&api_key=${apiKey}`,
    )
    if (response) {
      return response.data.photos
    }
  } catch (error) {
    console.error(error)
  }
}
