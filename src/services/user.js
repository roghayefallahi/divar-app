import api from "configs/api";

const getProfile = () => api.get("user/whoami").then((res) => res || false);
const getPosts = () => api.get("post/my");
const getAllPosts = () => api.get("");
const getPostById = (id) => api.get(`post/${id}`);
// const getCategoryById = (id) => api.get(`category/${id}`);

export { getProfile, getPosts, getAllPosts, getPostById };
