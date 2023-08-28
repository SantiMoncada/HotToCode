import axios from "axios";
import { backURL } from "./constants";

class CommentService {
  constructor() {
    this.api = axios.create({
      baseURL: `${backURL}/api/comments`,
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  createComment(post_id, commentData) {
    return this.api.post(`/create/${post_id}`, commentData);
  }

  getComment(post_id) {
    return this.api.get(`/${post_id}`);
  }

  editComment(comment_id, commentData) {
    return this.api.put(`/edit/${comment_id}`, commentData);
  }

  deleteComment(comment_id) {
    return this.api.delete(`delete/${comment_id}`);
  }
}

const commentService = new CommentService();

export default commentService;
