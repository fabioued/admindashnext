import axios from "axios";

export const dev_api = process.env.NEXT_PUBLIC_API_DEV;
export const prod_api = process.env.NEXT_PUBLIC_API_BLOG_API;

import { API_URL, CLOUNDNARY_URL, UPLOAD_PRESET, POST_FAILED_MSG, POST_SUCCESS_MSG } from "../../util/constant";
import { validateSchema } from "../../validations";

//const api_link = dev_api;

const api_link = prod_api;


export const fetchAll = async (payload) => {
    const url = `${api_link}blogs/admin/all`;
    const response = await axios.post(url, {});
    return response.data;
};

export const postData = async (data) => {
    const res = await uploadToCloundary(data.image);
    if (res) {
        const { url, public_id } = res;
        const { title, content, show_post, tags, keywords, slug, author, lang } = data;
        return publishPost({
            title,
            content,
            show_post,
            tags,
            keywords,
            slug,
            author,
            lang,
            image_url: url,
            image_public_id: public_id,
        });
    } else {
        return false;
    }
};
export const uploadToCloundary = async (image, setProgress) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", UPLOAD_PRESET);

    const url = CLOUNDNARY_URL;
    const response = await axios.post(url, formData, {
        onUploadProgress: (progressEvent) => {
            if (setProgress) {
                setProgress(
                    Math.ceil((progressEvent.loaded / progressEvent.total) * 100) / 2
                );
            }
        },
    });
    return response.data;
};

export const publishPost = async (data) => {
    const url = `${api_link}blogs`;
    const response = await axios.post(url, data);
    return response.data;
};

export const publish = async (data) => {
    const err = await validateSchema(data);
    // console.log({ err });
    if (err.length == 0) {
        const res = await postData(data);
        return {
            success: true,
            data: res
        };
    } else {
        return {
            success: false,
            data: err
        };
    }
};


export const fetchAllPress = async (payload) => {
    const url = `${api_link}presses/admin/all`;
    const response = await axios.post(url, {});
    return response.data;
};


const searchBlogs = async (query) => {
    const url = `${api_link}feeds/admin/search`;
    const response = await axios.post(url, { query });
    return response.data;
};

const deleteBlog = async (id) => {
    const url = `${api_link}blogs/${id}`;
    const response = await axios.delete(url);
    response.data["id"] = id;
    return response.data;
};


const blogsService = {
    fetchAll,
    fetchAllPress,
    deleteBlog,
    searchBlogs,
    uploadToCloundary,
    publishPost,
    postData,
    publish
};

export default blogsService;
