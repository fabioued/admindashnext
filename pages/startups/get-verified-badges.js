import InnerMenu from "../../components/Navigation/InnerMenu";
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Tag, Modal, Button } from 'antd'
import { Context } from "../../context/index"
import Links from "../../lib/innerMenu"
import { EyeFilled, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import ProtectedRoute from "..//../components/routes/protectedRoute"

const GetVerifiedBages = () => {

    const { state, dispatch } = useContext(Context);
    const { current_page } = state;

    useEffect(() => {
        (async () => {
            dispatch({
                type: "SET_CURRENT_PAGE",
                payload: 'get-verified-badges'
            });
        })();
    }, []);

    return (
        <>
            <InnerMenu links={Links.StartupsLinks} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb-main user-member justify-content-sm-between ">
                            <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                <div className="d-flex align-items-center user-member__title justify-content-center mr-sm-25">
                                    <h4 className="text-capitalize fw-500 breadcrumb-title pl-3">Landing Page</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-12 ">
                    <div className="contact-list-wrap mb-25">
                        <div className="contact-list bg-white radius-xl w-100">
                            <div className="table-responsive">
                                <table className="table getVerifiedTable mb-0 table-borderless table-rounded table table-striped">
                                    <thead>
                                        <tr className="userDatatable-header">
                                            {/* <th>
                                                <span className="userDatatable-title">#</span>
                                            </th> */}
                                            <th>
                                                <span className="userDatatable-title">Startup Name </span>
                                            </th>
                                            {/* <th>
                                                <span className="userDatatable-title">Email</span>
                                            </th> */}
                                            <th>
                                                <span className="userDatatable-title">Business Registration</span>
                                            </th>
                                            <th>
                                                <span className="userDatatable-title">Pitch Deck</span>
                                            </th>
                                            <th data-type="html" data-name="position">
                                                <span className="userDatatable-title">Founder Infos</span>
                                            </th>
                                            <th>
                                                <span className="userDatatable-title">Status</span>
                                            </th>
                                            <th>
                                                <span className="userDatatable-title float-right">Action</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>

                                            <td>
                                                <div className="contact-item d-flex align-items-center">
                                                    <div className="contact-personal-info d-flex">
                                                        <Avatar size={40} className="profile-image rounded-circle d-block m-0 wh-38"
                                                            src={''} />
                                                        <div className="contact_title">
                                                            <h6>
                                                                ConnectIO
                                                            </h6>
                                                            <p>admin.connectio.com</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="userDatatable-content">
                                                    <div className="col-12 justify-content-around d-flex flex-column">
                                                        <div>
                                                            <Button className="gvb-btn-view" type="primary" size="small" icon={<EyeFilled />}>
                                                                View
                                                            </Button>
                                                        </div>
                                                        <div>
                                                            <Button className="gvb-btn-confirm" type="primary" size="small" icon={<CheckCircleFilled />}>
                                                                Confirm
                                                            </Button>
                                                        </div>
                                                        <div>
                                                            <Button className="gvb-btn-reject" type="primary" size="small" icon={<CloseCircleFilled />}>
                                                                Reject
                                                            </Button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>
                                                <div className="userDatatable-content">
                                                    <div className="col-12 justify-content-around d-flex flex-column">
                                                        <div>
                                                            <Button className="gvb-btn-view" type="primary" size="small" icon={<EyeFilled />}>
                                                                View
                                                            </Button>
                                                        </div>
                                                        <div>
                                                            <Button className="gvb-btn-confirm" type="primary" size="small" icon={<CheckCircleFilled />}>
                                                                Confirm
                                                            </Button>
                                                        </div>
                                                        <div>
                                                            <Button className="gvb-btn-reject" type="primary" size="small" icon={<CloseCircleFilled />}>
                                                                Reject
                                                            </Button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>
                                                <div className="userDatatable-content" rowspan="4">
                                                    <div className="col-md-12">
                                                        <p>
                                                            Full Name:
                                                            <span className="pull-right">
                                                                Frank Okoro
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <p>
                                                            LinkedIn:
                                                            <span className="pull-right">
                                                                <Button className="gvb-btn-confirm" type="primary" size="small" icon={<CheckCircleFilled />}>
                                                                    View
                                                                </Button>
                                                            </span>
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>
                                                <div className="userDatatable-content">
                                                    <span className="text-black gvb-status-accepted">
                                                        <p>
                                                            <CheckCircleFilled color="red" />
                                                            <span className="pull-right ml-1">
                                                                Accepted
                                                            </span>
                                                        </p>
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="userDatatable-content">
                                                    <div className="col-md-12 justify-content-around d-flex flex-column">

                                                        <div>
                                                            <Button className="gvb-btn-confirm" type="primary" size="small" icon={<CheckCircleFilled />}>
                                                                Confirm
                                                            </Button>
                                                        </div>
                                                        <div>
                                                            <Button className="gvb-btn-reject" type="primary" size="small" icon={<CloseCircleFilled />}>
                                                                Reject
                                                            </Button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </td>

                                        </tr>
                                        <tr>

                                            <td>
                                                <div className="contact-item d-flex align-items-center">
                                                    <div className="contact-personal-info d-flex">
                                                        <Avatar size={40} className="profile-image rounded-circle d-block m-0 wh-38"
                                                            src={''} />
                                                        <div className="contact_title">
                                                            <h6>
                                                                ConnectIO
                                                            </h6>
                                                            <p>admin.connectio.com</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="userDatatable-content">
                                                    <div className="col-12 justify-content-around d-flex flex-column">
                                                        <div>
                                                            <Button className="gvb-btn-view" type="primary" size="small" icon={<EyeFilled />}>
                                                                View
                                                            </Button>
                                                        </div>
                                                        <div>
                                                            <Button className="gvb-btn-confirm" type="primary" size="small" icon={<CheckCircleFilled />}>
                                                                Confirm
                                                            </Button>
                                                        </div>
                                                        <div>
                                                            <Button className="gvb-btn-reject" type="primary" size="small" icon={<CloseCircleFilled />}>
                                                                Reject
                                                            </Button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>
                                                <div className="userDatatable-content">
                                                    <div className="col-12 justify-content-around d-flex flex-column">
                                                        <div>
                                                            <Button className="gvb-btn-view" type="primary" size="small" icon={<EyeFilled />}>
                                                                View
                                                            </Button>
                                                        </div>
                                                        <div>
                                                            <Button className="gvb-btn-confirm" type="primary" size="small" icon={<CheckCircleFilled />}>
                                                                Confirm
                                                            </Button>
                                                        </div>
                                                        <div>
                                                            <Button className="gvb-btn-reject" type="primary" size="small" icon={<CloseCircleFilled />}>
                                                                Reject
                                                            </Button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>
                                                <div className="userDatatable-content" rowspan="4">
                                                    <div className="col-md-12">
                                                        <p>
                                                            Full Name:
                                                            <span className="pull-right">
                                                                Frank Okoro
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <p>
                                                            LinkedIn:
                                                            <span className="pull-right">
                                                                <Button className="gvb-btn-confirm" type="primary" size="small" icon={<CheckCircleFilled />}>
                                                                    View
                                                                </Button>
                                                            </span>
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>
                                                <div className="userDatatable-content">
                                                    <span className="text-black gvb-status-pending">
                                                        <p>
                                                            <CheckCircleFilled />
                                                            <span className="pull-right ml-1">
                                                                Pending
                                                            </span>
                                                        </p>
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="userDatatable-content">
                                                    <div className="col-md-12 justify-content-around d-flex flex-column">

                                                        <div>
                                                            <Button className="gvb-btn-confirm" type="primary" size="small" icon={<CheckCircleFilled />}>
                                                                Confirm
                                                            </Button>
                                                        </div>
                                                        <div>
                                                            <Button className="gvb-btn-reject" type="primary" size="small" icon={<CloseCircleFilled />}>
                                                                Reject
                                                            </Button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </td>

                                        </tr>
                                        <tr>

                                            <td>
                                                <div className="contact-item d-flex align-items-center">
                                                    <div className="contact-personal-info d-flex">
                                                        <Avatar size={40} className="profile-image rounded-circle d-block m-0 wh-38"
                                                            src={''} />
                                                        <div className="contact_title">
                                                            <h6>
                                                                ConnectIO
                                                            </h6>
                                                            <p>admin.connectio.com</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="userDatatable-content">
                                                    <div className="col-12 justify-content-around d-flex flex-column">
                                                        <div>
                                                            <Button className="gvb-btn-view" type="primary" size="small" icon={<EyeFilled />}>
                                                                View
                                                            </Button>
                                                        </div>
                                                        <div>
                                                            <Button className="gvb-btn-confirm" type="primary" size="small" icon={<CheckCircleFilled />}>
                                                                Confirm
                                                            </Button>
                                                        </div>
                                                        <div>
                                                            <Button className="gvb-btn-reject" type="primary" size="small" icon={<CloseCircleFilled />}>
                                                                Reject
                                                            </Button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>
                                                <div className="userDatatable-content">
                                                    <div className="col-12 justify-content-around d-flex flex-column">
                                                        <div>
                                                            <Button className="gvb-btn-view" type="primary" size="small" icon={<EyeFilled />}>
                                                                View
                                                            </Button>
                                                        </div>
                                                        <div>
                                                            <Button className="gvb-btn-confirm" type="primary" size="small" icon={<CheckCircleFilled />}>
                                                                Confirm
                                                            </Button>
                                                        </div>
                                                        <div>
                                                            <Button className="gvb-btn-reject" type="primary" size="small" icon={<CloseCircleFilled />}>
                                                                Reject
                                                            </Button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>
                                                <div className="userDatatable-content" rowspan="4">
                                                    <div className="col-md-12">
                                                        <p>
                                                            Full Name:
                                                            <span className="pull-right">
                                                                Frank Okoro
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <p>
                                                            LinkedIn:
                                                            <span className="pull-right">
                                                                <Button className="gvb-btn-confirm" type="primary" size="small" icon={<CheckCircleFilled />}>
                                                                    View
                                                                </Button>
                                                            </span>
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>
                                                <div className="userDatatable-content">
                                                    <span className="text-black gvb-status-declined">
                                                        <p>
                                                            <CheckCircleFilled />
                                                            <span className="pull-right ml-1">
                                                                Declined
                                                            </span>
                                                        </p>
                                                    </span>


                                                </div>
                                            </td>
                                            <td>
                                                <div className="userDatatable-content">
                                                    <div className="col-md-12 justify-content-around d-flex flex-column">

                                                        <div>
                                                            <Button className="gvb-btn-confirm" type="primary" size="small" icon={<CheckCircleFilled />}>
                                                                Confirm
                                                            </Button>
                                                        </div>
                                                        <div>
                                                            <Button className="gvb-btn-reject" type="primary" size="small" icon={<CloseCircleFilled />}>
                                                                Reject
                                                            </Button>
                                                        </div>
                                                    </div>

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

export default GetVerifiedBages;