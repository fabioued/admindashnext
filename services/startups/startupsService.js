import axios from "axios";

export const dev_api = process.env.NEXT_PUBLIC_API_DEV;
export const prod_api = process.env.NEXT_PUBLIC_API_PROD;

export const vault_api_dev = 'https://vault-dev-api.ourbantaba.com/';

//const api_link = dev_api;

const api_link = prod_api;


const fetchAllVaults = async () => {
    const url = `${vault_api_dev}vaults`;
    const response = await axios.get(url);
    return response.data;
}



const updateVault = async (data) => {
    const url = `${vault_api_dev}vaults/`;
    const response = await axios.patch(url, data);
    return response.data;
};

const fetchRecords = async (page, pagination, type) => {
    const url = `${api_link}startups/admin/loadmore-startups/${page}/${pagination}/${type}`;
    const response = await axios.get(url);
    return response.data;
};

const fetchSingleRecord = async (payload) => {
    const url = `${api_link}startups/admin/view-startup/${payload.id}`;
    const response = await axios.get(url);
    response.data["startup_name"] = payload.name;
    return response.data;
};


const searchStartupsRecord = async (query) => {
    const url = `${api_link}startups/admin/search`;
    const response = await axios.post(url, { query });
    return response.data;
};
const loadMoreRecords = async (payload) => {
    const { type, page, pagination } = payload;
    const url = `${api_link}startups/admin/loadmore-startups/${page}/${pagination}/${type}`;
    const response = await axios.get(url);
    return response.data;
};

const fetchLastMonthRecords = async (data) => {
    const payload = {
        option: "lastMonth",
        page: data.page,
        pagination: data.pagination,
    };
    const url = `${api_link}startups/admin/filter`;
    const response = await axios.post(url, payload);
    return response.data;
};

const deleteRecord = async (id) => {
    const payload = {
        id,
    };
    const url = `${api_link}startups/admin/delete-startup`;
    const response = await axios.post(url, payload);
    response.data["startup_id"] = id;
    return response.data;
};

const rejectStartup = async (payload) => {
    const url = `${api_link}startups/admin/reject-startup`;
    const response = await axios.post(url, payload);
    // if (response.data.statusMsg) {
    //     alert("You have been rejected successfully.");
    // }
    return response.data;
};

const fetchStartupDateRange = async (payload) => {
    const { startDate, endDate, page, pagination } = payload;
    const data = {
        option: "dateRange",
        page,
        pagination,
        startDate,
        endDate,
    };
    const url = `${api_link}startups/admin/filter`;
    const response = await axios.post(url, data);

    if (response.data.statusMsg !== "Error") {
        response.data["startDate"] = startDate;
        response.data["endDate"] = endDate;
    }

    return response.data;
};

const confirmStartup = async (id) => {
    const url = `${api_link}startups/admin/confirm-startup`;
    const payload = {
        id,
    };
    const response = await axios.post(url, payload);
    response.data["startup_id"] = id;
    return response.data;
};

const diasporaService = {
    fetchRecords,
    fetchSingleRecord,
    loadMoreRecords,
    confirmStartup,
    fetchStartupDateRange,
    fetchLastMonthRecords,
    deleteRecord,
    rejectStartup,
    searchStartupsRecord,
    fetchAllVaults,
    updateVault
};

export default diasporaService;
