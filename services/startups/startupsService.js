import axios from "axios";

const fetchRecords = async (page, pagination, type) => {
    const url = `${process.env.NEXT_PUBLIC_API_DEV}startups/admin/loadmore-startups/${page}/${pagination}/${type}`;
    const response = await axios.get(url);
    return response.data;
};

const fetchSingleRecord = async (payload) => {
    const url = `${process.env.NEXT_PUBLIC_API_DEV}startups/admin/view-startup/${payload.id}`;
    const response = await axios.get(url);
    response.data["startup_name"] = payload.name;
    return response.data;
};


const searchStartupsRecord = async (query) => {
    const url = `${process.env.NEXT_PUBLIC_API_DEV}startups/admin/search`;
    const response = await axios.post(url, { query });
    return response.data;
};
const loadMoreRecords = async (payload) => {
    const { type, page, pagination } = payload;
    const url = `${process.env.NEXT_PUBLIC_API_DEV}startups/admin/loadmore-startups/${page}/${pagination}/${type}`;
    const response = await axios.get(url);
    return response.data;
};

const fetchLastMonthRecords = async (data) => {
    const payload = {
        option: "lastMonth",
        page: data.page,
        pagination: data.pagination,
    };
    const url = `${process.env.NEXT_PUBLIC_API_DEV}startups/admin/filter`;
    const response = await axios.post(url, payload);
    return response.data;
};

const deleteRecord = async (id) => {
    const payload = {
        id,
    };
    const url = `${process.env.NEXT_PUBLIC_API_DEV}startups/admin/delete-startup`;
    const response = await axios.post(url, payload);
    response.data["startup_id"] = id;
    return response.data;
};

const rejectStartup = async (payload) => {
    const url = `${process.env.NEXT_PUBLIC_API_DEV}startups/admin/reject-startup`;
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
    const url = `${process.env.NEXT_PUBLIC_API_DEV}startups/admin/filter`;
    const response = await axios.post(url, data);

    if (response.data.statusMsg !== "Error") {
        response.data["startDate"] = startDate;
        response.data["endDate"] = endDate;
    }

    return response.data;
};

const confirmStartup = async (id) => {
    const url = `${process.env.NEXT_PUBLIC_API_DEV}startups/admin/confirm-startup`;
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
    searchStartupsRecord
};

export default diasporaService;
