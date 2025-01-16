import api from "configs/api";

const getProfile = () => api.get("api/user/whoami").then((res) => res || false);
const getPosts = () => api.get("api/posts/my");
const getAllPosts = () => api.get("");
const getPostById = (id) => api.get(`api/posts/${id}`);
const deletePost = (id) => api.delete(`api/posts/delete/${id}`);
// const getCategoryById = (id) => api.get(`category/${id}`);

export { getProfile, getPosts, getAllPosts, getPostById, deletePost};
