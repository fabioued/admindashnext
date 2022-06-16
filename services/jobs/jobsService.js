import axios from "axios";

export const dev_api = process.env.NEXT_PUBLIC_API_DEV;
export const prod_api = process.env.NEXT_PUBLIC_API_PROD;

//const api_link = dev_api;

const api_link = prod_api;


export const fetchJobs = async (payload) => {
    const { pagination, lang } = payload;
    let lowercase = lang.toLowerCase();
    const url = `${api_link}jobs/all/${lowercase}`;
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
const deleteJob = async (id) => {
    const url = `${api_link}jobs/${id}/delete`;
    const response = await axios.get(url);
    response.data["id"] = id;
    return response.data;
};


const jobsService = {
    fetchJobs,
    loadMoreRecords,
    deleteJob,
    searchFeeds,
};

export default jobsService;
