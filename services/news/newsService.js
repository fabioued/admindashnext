import axios from "axios";

export const dev_api = process.env.NEXT_PUBLIC_API_DEV;
export const prod_api = process.env.NEXT_PUBLIC_API_PROD;

//const api_link = dev_api;

const api_link = prod_api;
//const api_link = dev_api;


export const fetchNews = async (payload) => {
    const { pagination, lang } = payload;
    let lowercase = lang.toLowerCase();
    const url = `${api_link}news/all/pagination/${pagination}/${lowercase}`;
    const response = await axios.get(url);
    return response.data;
};

const loadMoreRecords = async (payload) => {
    const { lang, page, pagination, type } = payload;
    const url = `${api_link}feeds/admin/loadmore-feeds/${page}/${pagination}/${type}/${lang}`;
    const response = await axios.get(url);
    return response.data;
};

const searchFeeds = async (query) => {
    const url = `${api_link}feeds/admin/search`;
    const response = await axios.post(url, { query });
    return response.data;
};
const deleteNews = async (id) => {
    const url = `${api_link}news/${id}/delete`;
    const response = await axios.get(url);
    response.data["id"] = id;
    return response.data;
};

const rejectFeed = async (id) => {
    const url = `${api_link}feeds/admin/reject-feed`;
    const payload = {
        id,
    };
    const response = await axios.post(url, payload);
    response.data["id"] = id;
    return response.data;
};

const approveFeed = async (id) => {
    const url = `${api_link}feeds/admin/confirm-feed`;
    const payload = {
        id,
    };
    const response = await axios.post(url, payload);
    response.data["id"] = id;
    return response.data;
};

const newsService = {
    fetchNews,
    loadMoreRecords,
    deleteNews,
    rejectFeed,
    approveFeed,
    searchFeeds,
};

export default newsService;
