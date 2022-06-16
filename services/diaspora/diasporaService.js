import axios from "axios";

export const dev_api = process.env.NEXT_PUBLIC_API_DEV;
export const prod_api = process.env.NEXT_PUBLIC_API_PROD;

//const api_link = dev_api;

const api_link = prod_api;

const fetchRecords = async (page, pagination, type) => {
    const url = `${api_link}diaspora/admin/loadmore-diaspora/${page}/${pagination}/${type}`;
    const response = await axios.get(url);
    return response.data;
};

const fetchSingleRecord = async (payload) => {
    const url = `${api_link}diaspora/admin/view-diaspora/${payload.id}`;
    const response = await axios.get(url);
    response.data["diaspora_title"] = payload.name;
    return response.data;
};


const searchDiasporaRecord = async (query) => {
    const url = `${api_link}diaspora/admin/search`;
    const response = await axios.post(url, { query });
    return response.data;
};
const loadMoreRecords = async (payload) => {
    const { type, page, pagination } = payload;
    const url = `${api_link}diaspora/admin/loadmore-diaspora/${page}/${pagination}/${type}`;
    const response = await axios.get(url);
    return response.data;
};

const fetchLastMonthRecords = async (data) => {
    const payload = {
        option: "lastMonth",
        page: data.page,
        pagination: data.pagination,
    };
    const url = `${api_link}diaspora/admin/filter`;
    const response = await axios.post(url, payload);
    return response.data;
};

const deleteRecord = async (id) => {
    const payload = {
        id,
    };
    const url = `${api_link}diaspora/admin/delete-diaspora`;
    const response = await axios.post(url, payload);
    response.data["id"] = id;
    return response.data;
};

const RejectDiaspora = async (payload) => {
    const url = `${api_link}diaspora/admin/reject-diaspora`;
    const response = await axios.post(url, payload);
    return response.data;
};

const fetchDiasporaDateRange = async (payload) => {
    const { startDate, endDate, page, pagination } = payload;
    const data = {
        option: "dateRange",
        page,
        pagination,
        startDate,
        endDate,
    };
    const url = `${api_link}diaspora/admin/filter`;
    const response = await axios.post(url, data);

    if (response.data.statusMsg !== "Error") {
        response.data["startDate"] = startDate;
        response.data["endDate"] = endDate;
    }

    return response.data;
};

const confirmDiaspora = async (id) => {
    const url = `${api_link}diaspora/admin/confirm-diaspora`;
    const payload = {
        id,
    };
    const response = await axios.post(url, payload);
    response.data["id"] = id;
    return response.data;
};

const diasporaService = {
    fetchRecords,
    fetchSingleRecord,
    loadMoreRecords,
    confirmDiaspora,
    fetchDiasporaDateRange,
    fetchLastMonthRecords,
    deleteRecord,
    RejectDiaspora,
    searchDiasporaRecord
};

export default diasporaService;
