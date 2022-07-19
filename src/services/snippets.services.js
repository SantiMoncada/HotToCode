import axios from 'axios'

class SnippetService {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/snippets`
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

    getSnippets() {
        return this.api.get('/list')
    }

    getOneSnippet(snippet_id) {
        return this.api.get(`/details/${snippet_id}`)
    }

    editSnippet(snippet_id) {
        return this.api.put(`/edit/${snippet_id}`)
    }

    deleteSnippet(snippet_id) {
        return this.api.delete(`/delete/${snippet_id}`)
    }

}

const snippetService = new SnippetService()

export default snippetService