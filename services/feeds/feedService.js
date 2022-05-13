import axios from "axios";

export const fetchFeeds = async (payload) => {
    const { type, page, pagination, lang } = payload;
    let lowercase = lang.toLowerCase();
    const url = `${process.env.NEXT_PUBLIC_API_DEV}feeds/admin/loadmore-feeds/${page}/${pagination}/${type}/${lowercase}`;
    const response = await axios.get(url);
    return response.data;
};

const loadMoreRecords = async (payload) => {
    const { lang, page, pagination, type } = payload;
    const url = `${process.env.NEXT_PUBLIC_API_DEV}feeds/admin/loadmore-feeds/${page}/${pagination}/${type}/${lang}`;
    const response = await axios.get(url);
    return response.data;
};

const searchFeeds = async (query) => {
    const url = `${process.env.NEXT_PUBLIC_API_DEV}feeds/admin/search`;
    const response = await axios.post(url, { query });
    return response.data;
};
const deleteFeed = async (id) => {
    const url = `${process.env.NEXT_PUBLIC_API_DEV}feeds/admin/delete/${id}`;
    const response = await axios.get(url);
    response.data["id"] = id;
    return response.data;
};

const rejectFeed = async (id) => {
    const url = `${process.env.NEXT_PUBLIC_API_DEV}feeds/admin/reject-feed`;
    const payload = {
        id,
    };
    const response = await axios.post(url, payload);
    response.data["id"] = id;
    return response.data;
};

const approveFeed = async (id) => {
    const url = `${process.env.NEXT_PUBLIC_API_DEV}feeds/admin/confirm-feed`;
    const payload = {
        id,
    };
    const response = await axios.post(url, payload);
    response.data["id"] = id;
    return response.data;
};

const feedService = {
    fetchFeeds,
    loadMoreRecords,
    deleteFeed,
    rejectFeed,
    approveFeed,
    searchFeeds,
};

export default feedService;
