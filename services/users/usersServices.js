import axios from "axios";

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
    const url = `${process.env.NEXT_PUBLIC_API_DEV}feeds/admin/search`;
    const response = await axios.post(url, { query });
    return response.data;
};
const deleteUser = async (id) => {
    const url = `${process.env.NEXT_PUBLIC_API_DEV}feeds/admin/delete/${id}`;
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
