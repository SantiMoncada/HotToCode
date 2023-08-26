import axios from 'axios'

class SnippetService {

    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.FRONT_APP_BACK_END_URL}/api/snippets`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    createSnippet(snippetData) {
        return this.api.post('/create', snippetData)
    }

    getSnippets(values) {
        return this.api.get('/list', { params: values })
    }

    getOneSnippet(snippet_id) {
        return this.api.get(`/details/${snippet_id}`)
    }

    editSnippet(snippet_id, data) {
        return this.api.put(`/edit/${snippet_id}`, data)
    }

    deleteSnippet(snippet_id) {
        return this.api.delete(`/delete/${snippet_id}`)
    }

}

const snippetService = new SnippetService()

export default snippetService