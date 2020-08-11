import axios from "axios";

export const fetchPosts = () => {
    return axios.get('/api/posts')
};

export const createPost = (post) => {
    return axios.post('/api/posts/', post)
}