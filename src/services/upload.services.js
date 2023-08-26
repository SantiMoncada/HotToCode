import axios from 'axios'

class UploadService {

    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.FRONT_APP_BACK_END_URL}/upload`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    uploadimage(imageForm) {
        return this.api.post('/image', imageForm)
    }
}

const uploadService = new UploadService()

export default uploadService