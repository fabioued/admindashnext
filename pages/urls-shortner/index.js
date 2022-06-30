import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Tag, Modal, Button } from 'antd'
import { Context } from "../../context/index"
import ProtectedRoute from "..//../components/routes/protectedRoute"
import BreadCrumb from "../../components/Navigation/Breadcrumb"
import { CopyFilled } from '@ant-design/icons';
import SearchInput from "../../components/shortner/SearchInput";
import UrlList from "../../components/shortner/UrlList";
import Toast from "../../components/shortner/Toast";
import shortnerService from "../../services/shortner/shortnerServices";
import PageLoader from '../../components/loaders/PageLoader'


const UrlShortner = () => {

    const { state, dispatch } = useContext(Context);
    const { urls, urls_count, link_info_visible, loading } = state;

    useEffect(() => {
        (async () => {
            dispatch({
                type: "SET_LOADING",
                payload: true
            });
            const data = await shortnerService.urlLists();
            dispatch({
                type: "SET_URLS",
                payload: data
            });
            dispatch({
                type: "SET_URLS_COUNT",
                payload: data.length
            });

            dispatch({
                type: "SET_CURRENT_PAGE",
                payload: 'urls-shortner'
            });

            dispatch({
                type: "SET_LOADING",
                payload: false
            });
        })();
    }, []);

    return (
        <ProtectedRoute>
            {loading && (<PageLoader />)}
            {!loading && (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-main user-member justify-content-sm-between ">
                                <BreadCrumb title={"Urls Shortner"} count={urls_count} />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 ">
                        <div className="contact-list-wrap mb-25">
                            <div className="contact-list bg-white radius-xl w-100">
                                <Toast />
                                <SearchInput />
                                {link_info_visible && <div className="contact-list radius-xl w-100 shortnerResult">
                                    <div className="row m-50 ">
                                        <div className="col-md-10">
                                            <p>Https://Ourbantaba.com/Urlsdd</p>
                                        </div>
                                        <div className="col-md-2">
                                            <button type="submit" className="btn btn-info ml-10  btn-lg px-20"><CopyFilled /> Copy</button>
                                        </div>
                                    </div>
                                </div>}

                                <UrlList urls={urls} />
                            </div>
                        </div>
                    </div>
                </div>)}

        </ProtectedRoute>
    );
};

export default UrlShortner;