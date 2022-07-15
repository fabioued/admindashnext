import InnerMenu from "../../components/Navigation/InnerMenu";
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../context/index";
import BreadCrumb from "../../components/Navigation/Breadcrumb"
import Links from "../../lib/innerMenu";
import PageLoader from '../../components/loaders/PageLoader'
import { Modal, Alert, Button, Tag, Space } from 'antd';
import { SyncOutlined, CloseCircleFilled, WarningFilled } from '@ant-design/icons';
import { toast } from "react-toastify"
import ProtectedRoute from "../../components/routes/protectedRoute";
import blogsService from "../../services/blogs/blogsService";

import FeaturedImage from "../../components/Form-elements/FeaturedImage";
import FormCheck from "../../components/Form-elements/FormCheck";
import FormControl from "../../components/Form-elements/FormControl";
import FormSelect from "../../components/Form-elements/FormSelect";

import TextEditor from "../../components/Form-elements/TextEditor";

import {
    DEFAULT_TAGS,
    INIT_FORM_VALUE,
    LANGUAGE_OPTIONS,
    RADIO_BTN_OPTIONS,
} from "../../util/constant";


import { getFormData } from "../../util";

const Blogs = () => {
    const { state, dispatch } = useContext(Context);
    let { loading } = state;
    const [buttonLoading, setButtonLoading] = useState(false);
    const [formValue, setFormValues] = useState(INIT_FORM_VALUE);
    const [tags, setTags] = useState([]);
    const [keywords, setKeywords] = useState([]); const [image, setImage] = useState(null);
    const [imgDimension, setImgDimension] = useState({});
    const [errors, setErrors] = useState({});
    const [editorValue, setEditorValue] = useState("");
    let [lang, setLang] = useState('en');

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setFormValues((old) => ({ ...old, [name]: value }));
    };


    const defaultLang = { label: "English", value: 'en' }

    const blockOnEnterSubmit = (e) => e.key === "Enter" && e.preventDefault();

    const clearFormData = () => {
        setFormValues(INIT_FORM_VALUE);
        [setTags, setKeywords].map((setFun) => setFun([]));
        [setLang, setImage].map((setFun) => setFun(null));
        setEditorValue("");
    };

    const handleOnSumbit = async (e) => {
        dispatch({
            type: "SET_LOADING",
            payload: true
        });
        e.preventDefault();
        const data = getFormData(formValue, lang, tags, keywords, editorValue, image);
        // console.log({ data })
        const res = await blogsService.publish(data);
        //console.log({ res });
        if (res.success) {
            clearFormData();
            toast.success('The blog has been created successfully !!!', {
                position: toast.POSITION.TOP_RIGHT
            })
        } else {
            res.data.forEach((error) => {
                setErrors((old) => ({ ...old, [error.path[0]]: error.message }));
            });
            toast.error(errors, {
                position: toast.POSITION.TOP_RIGHT
            });
        }

        dispatch({
            type: "SET_LOADING",
            payload: false
        });


    };


    useEffect(() => {
        (async () => {
            dispatch({
                type: "SET_CURRENT_PAGE",
                payload: 'all-blogs'
            });
            dispatch({
                type: "SET_LOADING",
                payload: false
            });
        })();
    }, []);

    return (
        <ProtectedRoute>
            <InnerMenu links={Links.blogsLinks} />
            {loading && (<PageLoader />)}
            {!loading && (
                <div className="container-fluid card p-3">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="breadcrumb-main user-member justify-content-sm-between ">
                                <BreadCrumb title={"Add a New Blog Post"} />
                            </div>
                        </div>
                    </div>
                    <div className="bookmark-page__list ">
                        <div className="row py-4 px-4">
                            <form onSubmit={handleOnSumbit} onKeyDown={blockOnEnterSubmit} className="createForm">
                                <div className="row mb-2">
                                    <FormControl
                                        id="title"
                                        name="title"
                                        className="col-sm-12"
                                        label="Title"
                                        required={true}
                                        value={formValue.title}
                                        onChange={handleOnChange}
                                        errorMessage={errors.title}
                                    />
                                </div>

                                <div className="row mb-2">
                                    <FormControl
                                        id="author"
                                        name="author"
                                        className="col-sm-6"
                                        label="Author"
                                        required={true}
                                        value={formValue.author}
                                        onChange={handleOnChange}
                                        errorMessage={errors.author}
                                    />
                                    <FormSelect
                                        id="lang"
                                        name="lang"
                                        className="col-sm-6"
                                        label="Language"
                                        required={true}
                                        placeholder="Select Language"
                                        options={LANGUAGE_OPTIONS}
                                        selectedOptions={lang}
                                        setSelectedOptions={setLang}
                                        errorMessage={errors.lang}
                                    />
                                </div>

                                <div className="row mt-5 mb-3">
                                    <FeaturedImage
                                        id="featured-image"
                                        image={image}
                                        required={true}
                                        className="col-sm-6"
                                        setImage={setImage}
                                        setImgDimension={setImgDimension}
                                        errorMessage={errors.image || errors.imgDimension}
                                    />
                                </div>

                                <div className="row mb-2">
                                    <FormCheck
                                        className="d-flex"
                                        name="show_post"
                                        required={true}
                                        checked={formValue.show_post}
                                        onChange={handleOnChange}
                                        options={RADIO_BTN_OPTIONS}
                                        errorMessage={errors.show_post}
                                    />
                                </div>

                                <div className="row mb-2 mt-4 gx-0">
                                    <TextEditor
                                        value={editorValue}
                                        onChange={setEditorValue}
                                        errorMessage={errors.content}
                                    />
                                </div>

                                <div className="row mb-5">
                                    <FormSelect
                                        id="input-tag"
                                        className="col-sm-6"
                                        name="tags"
                                        label="Input Tags"
                                        placeholder="Search or add a tag"
                                        isMulti
                                        options={DEFAULT_TAGS}
                                        selectedOptions={tags}
                                        setSelectedOptions={setTags}
                                        errorMessage={errors.tags}
                                    />
                                    <FormSelect
                                        id="seo-tags"
                                        className="col-sm-6"
                                        name="keywords"
                                        label="Input SEO Keywords"
                                        placeholder="Search or add a tag"
                                        isMulti
                                        options={DEFAULT_TAGS}
                                        selectedOptions={keywords}
                                        setSelectedOptions={setKeywords}
                                        errorMessage={errors.keywords}
                                    />
                                </div>

                                <div className="row mb-2">
                                    <button
                                        disabled={buttonLoading}
                                        className="btn btn-success bg-brand border-brand"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>)}

        </ProtectedRoute>
    );
};

export default Blogs;