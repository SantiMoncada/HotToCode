import axios from 'axios'

class UserServices {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/users`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getUser(user_id) {
        return this.api.get(`/details/${user_id}`)
    }

    editUser(user_id) {
        return this.api.put(`/edit/${user_id}`)
    }

    favSnippet(snippet_id) {
        return this.api.put(`/favSnippet/${snippet_id}`)
    }

    rmFavSnippet(snippet_id) {
        return this.api.put(`/rmSnippet/${snippet_id}`)
    }
}

const userService = new UserServices

export default userService