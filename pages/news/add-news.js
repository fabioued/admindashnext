import InnerMenu from "../../components/Navigation/InnerMenu";
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../context/index"
import Links from "../../lib/innerMenu"
import LoadMore from "../../components/loadMore/index"
import PageLoader from '../../components/loaders/PageLoader'
import { toast } from "react-toastify"


import EmptyCard from "../../components/empty/Card";
import NewsCard from "../../components/news/NewsCard"
import newsService from "../../services/news/newsService";

import Filter from "../../components/filters/index";
import BreadCrumb from "../../components/Navigation/Breadcrumb"
import BreadcrumbButton from "../../components/Navigation/BreadcrumbButton";
import { SyncOutlined, CloseCircleFilled, WarningFilled } from '@ant-design/icons';
import {
    Alert,
    Form,
    Input,
    Select,
    Upload,
    Button,
    DatePicker
} from 'antd';

const News = () => {

    const { state, dispatch } = useContext(Context);
    let { current_page, news, news_count, pagination,
        loading, current_news, modal_is_open, modal_name, modal_title
    } = state;

    const { Option } = Select;


    const [buttonLoading, setButtonLoading] = useState(false);

    let [lang, setLang] = useState('en');
    let message = "Are you sure you want to delete ? You can't undo this action.";
    lang = "en";

    useEffect(() => {
        (async () => {
            dispatch({
                type: "SET_LOADING",
                payload: true
            });

            const data = await newsService.fetchNews({
                pagination, lang
            });
            dispatch({
                type: "SET_NEWS",
                payload: data.news
            });
            dispatch({
                type: "SET_NEWS_COUNT",
                payload: data.news.length
            });

            dispatch({
                type: "SET_CURRENT_PAGE",
                payload: 'all-news'
            });
            dispatch({
                type: "SET_LOADING",
                payload: false
            });
        })();
    }, []);


    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <>
            <InnerMenu links={Links.newsLinks} />
            {loading && (<PageLoader />)}
            {!loading && (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="breadcrumb-main user-member justify-content-sm-between ">
                                <BreadCrumb title={"Add News"} />
                            </div>
                        </div>
                    </div>

                </div>)}

            <div className="col-lg-12">
                <div className="card card-Vertical card-default card-md mb-4">
                    <div className="card-body py-md-30">
                        <form className="createForm">
                            <div className="row">
                                <div className="col-md-12 mb-25">
                                    <label for="formGroupExampleInputs" class="color-dark fs-14 fw-500 align-center">News Title *</label>
                                    <input type="text" required className="form-control ih-medium ip-gray radius-xs b-light px-15" placeholder="" />
                                </div>
                                <div className="col-md-6 mb-25">
                                    <label for="formGroupExampleInput3" class="color-dark fs-14 fw-500 align-center">Country *</label>
                                    <Select defaultValue="en" onChange={handleChange} style={{ width: '100%' }}>
                                        <Option value="en">English</Option>
                                        <Option value="fr">French</Option>
                                    </Select>
                                </div>
                                <div className="col-md-6 mb-25">
                                    <label for="formGroupExampleInput3" class="color-dark fs-14 fw-500 align-center">Language</label>
                                    <Select defaultValue="en" onChange={handleChange} style={{ width: '100%' }}>
                                        <Option value="en">English</Option>
                                        <Option value="fr">French</Option>
                                    </Select>
                                </div>
                                <div className="col-md-6 mb-25">
                                    <label for="formGroupExampleInputs" class="color-dark fs-14 fw-500 align-center">News Publisher</label>
                                    <input type="text" className="form-control ih-medium ip-gray radius-xs b-light px-15" placeholder="" />
                                </div>
                                <div className="col-md-6 mb-25">
                                    <label for="formGroupExampleInputs" class="color-dark fs-14 fw-500 align-center">Published Date *</label>
                                    <DatePicker format="YYYY-MM-DD" className="form-control selectDate ih-medium ip-gray radius-xs b-light px-15" />
                                </div>
                                <div className="col-md-12 mb-25">
                                    <label for="formGroupExampleInputs" class="color-dark fs-14 fw-500 align-center">Source Link *</label>
                                    <input type="link" required className="form-control ih-medium ip-gray radius-xs b-light px-15" placeholder="" />
                                </div>
                                <div className="col-md-12 mb-25">
                                    <label for="formGroupExampleInputs" class="color-dark fs-14 fw-500 align-center">Summary *</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows={10} defaultValue={""} />
                                </div>
                                <div className="col-md-12 mb-25">
                                    <label for="formGroupExampleInputs" class="color-dark fs-14 fw-500 align-center">Full Text *</label>
                                    <input type="text" required className="form-control ih-medium ip-gray radius-xs b-light px-15" placeholder="" />
                                </div>
                                <div className="col-md-8">
                                    <div className=" bookmark__button py-20  mt-15 flex-wrap">
                                        <div className="button-group">
                                            {<Button block className="btn-large btn btn-success btn-squared border-squared px-20 " onClick={() => showModal(blog)}>Save</Button>}
                                            {<Button block className="btn-large btn btn-danger  btn-squared border-squared px-30 " onClick={() => showDeleteBlogModal(blog)}>Delete</Button>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/* ends: .card */}
            </div>
        </>
    );
};

export default News;