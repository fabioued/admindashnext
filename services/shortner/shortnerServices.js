import axios from "axios";

export const dev_api = process.env.NEXT_PUBLIC_API_URLSHORTNERDEV;
export const prod_api = process.env.NEXT_PUBLIC_API_URLSHORTNERDEV;

export const url_shortner_Dev = 'https://shortner.ourbantaba.com/'
const api_link = dev_api;

//const api_link = prod_api;


export const urlLists = async () => {
    const url = url_shortner_Dev + `shortened-urls`;
    const response = await axios.get(url);
    return response.data;
};

export const shortenUrl = async (urlInput) => {
    const url = url_shortner_Dev + `create-short-url`;

    try {
        const response = await axios.post(url, { original_url: urlInput })
        return response.data;
    } catch (err) {
        return err.response;
    }



}

const removeLink = async (id) => {
    const url = url_shortner_Dev + `delete-link/` + id;
    const response = await axios.delete(url);
    return response.data;
};


const shortnerServices = {
    urlLists,
    removeLink,
    shortenUrl
};

export default shortnerServices;
