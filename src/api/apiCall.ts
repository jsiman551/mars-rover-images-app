import { 
    apiKey, 
    baseApiUrl 
} from "@/contants"
const axios = require('axios')

/* call photos from Curiosity rover only */
export const getPhotos = async ( 
    roverName: string 
) => {
    try {
        const response = await axios.get(`${baseApiUrl}rovers/${roverName}/photos?sol=1000&api_key=${apiKey}`);
        if (response) {
            return response.data.photos
        }
      } catch (error) {
        console.error(error);
      }
}
