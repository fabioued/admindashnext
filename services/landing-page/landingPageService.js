import axios from "axios";

export const dev_api = process.env.NEXT_PUBLIC_API_LANDING_DEV;
export const prod_api = process.env.NEXT_PUBLIC_API_LANDING_PROD;

//const api_link = dev_api;

const api_link = prod_api;

// TEAM MEMBERS

export const fetchAllMembers = async (payload) => {
    const url = `${api_link}teams/members/all`;
    const response = await axios.get(url);
    return response.data;
};


// TESTIMONIALS

export const fetchAllTestimonials = async (lang) => {
    const url = `${api_link}testimonials/${lang}/all`;
    const response = await axios.get(url);
    return response.data;
};


// PARTNERS

export const fetchAllPartners = async () => {
    const url = `${api_link}partners/all`;
    const response = await axios.get(url);
    return response.data;
};


// FAQ

const fetchAllGroups = async () => {
    const url = `${api_link}faqs/groups/all`;
    const response = await axios.get(url);
    return response.data;
};


//  NON DIASPORA  
const fetchAllNonDiaspora = async () => {
    const url = `${api_link}nonDiaspora/all`;
    const response = await axios.get(url);
    return response.data;
};

const deleteNonDiasporaRecord = async (email) => {
    const url = `${api_link}nonDiaspora/email/${email}/delete`;
    const response = await axios.delete(url);
    return response.data;
};

//  NEWSLETTER 
const fetchAllNewsletters = async (id) => {
    const url = `${api_link}newsletter/all`;
    const response = await axios.get(url);
    return response.data;
};

const deleteNewsletterRecord = async (email) => {
    const url = `${api_link}newsletter/email/${email}/delete`;
    const response = await axios.delete(url);
    return response.data;
};


//  REFERRALS
const fetchAllReferrals = async (id) => {
    const url = `${api_link}referrals/all`;
    const response = await axios.get(url);
    return response.data;
};

const deleteReferralRecord = async (id) => {
    const url = `${api_link}referrals/${id}/delete`;
    const response = await axios.delete(url);
    return response.data;
};

//  CONTACTS 
const fetchAllContacts = async (id) => {
    const url = `${api_link}contacts/all`;
    const response = await axios.get(url);
    return response.data;
};

const deleteContactRecord = async (id) => {
    const url = `${api_link}contacts/${id}/delete`;
    const response = await axios.delete(url);
    return response.data;
};



const landingPageService = {
    fetchAllMembers,
    fetchAllTestimonials,
    fetchAllPartners,
    fetchAllNonDiaspora,
    deleteNonDiasporaRecord,
    fetchAllNewsletters,
    deleteNewsletterRecord,
    fetchAllGroups,
    fetchAllContacts,
    deleteContactRecord,
    fetchAllReferrals,
    deleteReferralRecord
};

export default landingPageService;
