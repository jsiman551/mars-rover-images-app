import { 
    apiKey, 
    baseApiUrl 
} from "@/contants"
const axios = require('axios')

/* call photos */
export const getPhotos = async ( 
    roverName: string = 'curiosity',
    pageNumber: number = 1
) => {
    try {
        const response = await axios.get(`${baseApiUrl}rovers/${roverName}/photos?sol=1000&page=${pageNumber}&api_key=${apiKey}`);
        if (response) {
            return response.data.photos
        }
      } catch (error) {
        console.error(error);
      }
}
