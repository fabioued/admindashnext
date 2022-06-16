import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Tag, Modal, Button } from 'antd'
import { Context } from "../../context/index"
import ProtectedRoute from "..//../components/routes/protectedRoute"
import BreadCrumb from "../../components/Navigation/Breadcrumb"
import { CopyFilled } from '@ant-design/icons';

const UrlShortner = () => {

    const { state, dispatch } = useContext(Context);
    const { current_page } = state;

    useEffect(() => {
        (async () => {
            dispatch({
                type: "SET_CURRENT_PAGE",
                payload: 'urls-shortner'
            });
        })();
    }, []);

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb-main user-member justify-content-sm-between ">
                            <BreadCrumb title={"Urls Shortner"} count='0' />
                        </div>
                    </div>
                </div>
                <div className="col-12 ">
                    <div className="contact-list-wrap mb-25">
                        <div className="contact-list bg-white radius-xl w-100">
                            <form role="form">
                                <div className="row m-50">
                                    <div className="col-xs-12">
                                        <div className="input-group input-group-lg">
                                            <input type="text" className="form-control shortnerInput" placeholder="Paste your URL here" />
                                            <div className="input-group-btn">
                                                <button type="submit" className="btn btn-success ml-10  btn-lg px-20">  Shorten</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="contact-list radius-xl w-100 shortnerResult">
                                <div className="row m-50 ">
                                    <div className="col-md-10">
                                        <p>Https://Ourbantaba.com/Urlsdd</p>
                                    </div>
                                    <div className="col-md-2">
                                        <button type="submit" className="btn btn-info ml-10  btn-lg px-20"><CopyFilled /> Copy</button>
                                    </div>
                                </div>
                            </div>

                            <div className="table-responsive">
                                <table className="table getVerifiedTable mb-0 table-borderless table-rounded table table-striped">
                                    <thead>
                                        <tr className="userDatatable-header">
                                            {/* <th className="text-white">
                                                <span className="userDatatable-title float-right">User</span>
                                            </th> */}
                                            <th>
                                                <span className="userDatatable-title">Original </span>
                                            </th>

                                            <th>
                                                <span className="userDatatable-title">Shortened </span>
                                            </th>
                                            <th>
                                                <span className="userDatatable-title">Clicks</span>
                                            </th>
                                            <th data-type="html" data-name="position">
                                                <span className="userDatatable-title">Date</span>
                                            </th>
                                            <th data-type="html" data-name="position">
                                                <span className="userDatatable-title">Action</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            {/*  <td>
                                                <div className="contact-item d-flex align-items-center">
                                                    <h6>
                                                        Name Here
                                                    </h6>
                                                </div>
                                            </td> */}
                                            <td>
                                                <div className="userDatatable-content">
                                                    <div className="col-12 justify-content-around d-flex flex-column">
                                                        <a href="https://reactjsexample.com/pckd-the-most-analytics-intensive-self-hostable-url-shortener-with-an-amazing-ui/" className="">https://reactjsexample.com/pckd-the-most-analytics-intensive-self-hostable-url-shortener-with-an-amazing-ui/</a>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>
                                                <div className="userDatatable-content">
                                                    <a href="http://localhost:3000/urls-shortner?">https://ourbantaba.com/urlsdd</a>

                                                </div>
                                            </td>
                                            <td>
                                                <div className="userDatatable-content" rowspan="4">
                                                    29
                                                </div>
                                            </td>

                                            <td>
                                                <div className="userDatatable-content">
                                                    29/02/2022

                                                </div>
                                            </td>
                                            <td>
                                                <div className="userDatatable-content">
                                                    <CopyFilled className="copyIcon" />
                                                </div>
                                            </td>

                                        </tr>

                                    </tbody>

                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default UrlShortner;