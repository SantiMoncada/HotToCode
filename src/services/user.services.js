import axios from 'axios'

class UserServices {

    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.FRONT_APP_BACK_END_URL}/api/users`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getAllUsers(values) {
        return this.api.get('/', { params: values })
    }

    getUser(user_id) {
        return this.api.get(`/details/${user_id}`)
    }

    editUser(user_id, userData) {
        return this.api.put(`/edit/${user_id}`, userData)
    }

    favSnippet(snippet_id) {
        return this.api.put(`/favSnippet/${snippet_id}`)
    }

    rmFavSnippet(snippet_id) {
        return this.api.put(`/rmSnippet/${snippet_id}`)
    }

    getAllFavSnippets(user_id) {
        return this.api.get(`/getAllFavSnippets/${user_id}`)
    }
    getAllFavSnippetsContent(user_id) {
        return this.api.get(`/getAllFavSnippetsContent/${user_id}`)
    }
}

const userService = new UserServices()

export default userService