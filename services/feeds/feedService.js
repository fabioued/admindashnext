import axios from "axios";

export const fetchFeeds = async (language) => {
    let lowercase = language.toLowerCase();
    const url = `https://api-dev.ourbantaba.com/feeds/admin/loadmore-feeds/0/20/0/${lowercase}`;
    const response = await axios.get(url);
    return response.data;
};

const loadMoreRecords = async (payload) => {
    const { lang, page } = payload;
    const url = `https://api-dev.ourbantaba.com/feeds/admin/loadmore-feeds/${page}/20/0/${lang}`;
    const response = await axios.get(url);
    return response.data;
};

const deleteFeed = async (id) => {
    const url = `https://api-dev.ourbantaba.com/feeds/admin/delete/${id}`;
    const response = await axios.get(url);
    response.data["id"] = id;
    return response.data;
};

const rejectFeed = async (id) => {
    const url = `https://api-dev.ourbantaba.com/feeds/admin/reject-feed`;
    const payload = {
        id,
    };
    const response = await axios.post(url, payload);
    response.data["id"] = id;
    return response.data;
};

const approveFeed = async (id) => {
    const url = `https://api-dev.ourbantaba.com/feeds/admin/confirm-feed`;
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
};

export default feedService;
