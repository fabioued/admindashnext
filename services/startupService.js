import axios from "axios";

const fetchRecords = async (type) => {
    const url = `https://api-dev.ourbantaba.com/startups/admin/loadmore-startups/0/20/${type}`;
    const response = await axios.get(url);
    return response.data;
};

const fetchSingleRecord = async (payload) => {
    const url = `https://api-dev.ourbantaba.com/startups/admin/view-startup/${payload.id}`;
    const response = await axios.get(url);
    response.data["startup_name"] = payload.startup_name;
    return response.data;
};

const rejectStartup = async (payload) => {
    const url = `https://api-dev.ourbantaba.com/startups/admin/reject-startup`;
    const response = await axios.post(url, payload);
    if (response.data.statusMsg) {
        alert("You have been rejected successfully.");
    }
    return response.data;
};

const loadMoreRecords = async (payload) => {
    console.log(payload);

    const { type, page } = payload;

    const url = `https://api-dev.ourbantaba.com/startups/admin/loadmore-startups/${page}/20/${type}`;
    const response = await axios.get(url);
    return response.data;
};

const deleteRecord = async (id) => {
    const payload = {
        id,
    };
    const url = `https://api-dev.ourbantaba.com/startups/admin/delete-startup`;
    const response = await axios.post(url, payload);
    response.data["startup_id"] = id;
    return response.data;
};

const fetchLastMonthRecords = async (page) => {
    const payload = {
        option: "lastMonth",
        page,
        pagination: 20,
    };
    const url = `https://api-dev.ourbantaba.com/startups/admin/filter`;
    const response = await axios.post(url, payload);
    return response.data;
};

const fetchStartupDateRange = async (payload) => {
    const { startDate, endDate, page } = payload;
    const data = {
        option: "dateRange",
        page,
        pagination: 20,
        startDate,
        endDate,
    };
    const url = `https://api-dev.ourbantaba.com/startups/admin/filter`;
    const response = await axios.post(url, data);

    if (response.data.statusMsg !== "Error") {
        response.data["startDate"] = startDate;
        response.data["endDate"] = endDate;
    }

    return response.data;
};

const confirmStartup = async (id) => {
    const url = `https://api-dev.ourbantaba.com/startups/admin/confirm-startup`;
    const payload = {
        id,
    };
    const response = await axios.post(url, payload);
    response.data["startup_id"] = id;
    return response.data;
};

const startupService = {
    fetchRecords,
    fetchSingleRecord,
    deleteRecord,
    rejectStartup,
    loadMoreRecords,
    fetchLastMonthRecords,
    fetchStartupDateRange,
    confirmStartup,
};

export default startupService;
