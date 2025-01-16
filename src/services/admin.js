import api from "configs/api";

const addCategory = (data) => api.post("api/category", data);

const getCategory = () => api.get("api/category");

const deleteCategory = (id) => api.delete(`api/category/${id}`);

export { addCategory, getCategory, deleteCategory };
