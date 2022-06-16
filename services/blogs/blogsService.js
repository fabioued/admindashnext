import axios from "axios";

export const dev_api = process.env.NEXT_PUBLIC_API_DEV;
export const prod_api = process.env.NEXT_PUBLIC_API_BLOG_API;

//const api_link = dev_api;

const api_link = prod_api;


export const fetchAll = async (payload) => {
    const url = `${api_link}blogs/admin/all`;
    const response = await axios.post(url, {});
    return response.data;
};


export const fetchAllPress = async (payload) => {
    const url = `${api_link}presses/admin/all`;
    const response = await axios.post(url, {});
    return response.data;
};


const searchBlogs = async (query) => {
    const url = `${api_link}feeds/admin/search`;
    const response = await axios.post(url, { query });
    return response.data;
};


const deleteBlog = async (id) => {
    const url = `${api_link}jobs/${id}`;
    const response = await axios.delete(url);
    response.data["id"] = id;
    return response.data;
};


const blogsService = {
    fetchAll,
    fetchAllPress,
    deleteBlog,
    searchBlogs,
};

export default blogsService;
