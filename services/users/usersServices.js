import axios from "axios";

export const dev_api = process.env.NEXT_PUBLIC_API_DEV;
export const prod_api = process.env.NEXT_PUBLIC_API_PROD;

//const api_link = dev_api;

const api_link = prod_api;


export const fetchUsers = async () => {
    const url = `${process.env.NEXT_PUBLIC_API}users/all`;
    const response = await axios.get(url);
    return response.data;
};

const createUser = async (payload) => {
    const url = `${process.env.NEXT_PUBLIC_API}users/create`;
    const response = await axios.post(url, payload);
    return response.data;
};


const searchUsers = async (query) => {
    const url = `${api_link}feeds/admin/search`;
    const response = await axios.post(url, { query });
    return response.data;
};
const deleteUser = async (id) => {
    const url = `${api_link}feeds/admin/delete/${id}`;
    const response = await axios.get(url);
    response.data["id"] = id;
    return response.data;
};




const usersServices = {
    fetchUsers,
    deleteUser,
    createUser,
    searchUsers,
};

export default usersServices;
