import InnerMenu from "../../components/Navigation/InnerMenu";
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Tag, Modal, Button } from 'antd'
import { Context } from "../../context/index"
import Links from "../../lib/innerMenu"
import { EyeFilled, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import ProtectedRoute from "..//../components/routes/protectedRoute"
import startupsService from "../../services/startups/startupsService";
import PageLoader from '../../components/loaders/PageLoader'
import BreadCrumb from "../../components/Navigation/Breadcrumb"
import EmptyCard from "../../components/empty/Card";
import { SyncOutlined } from '@ant-design/icons';
import { toast } from "react-toastify"

const GetVerifiedBages = () => {

    const { state, dispatch } = useContext(Context);
    const [modalTitle, setModalTitle] = useState('');
    const [reason, setReason] = useState("");
    const [email, setEmail] = useState("");
    const { current_page,
        vaults, vaults_count,
        modal_is_open, modal_name,
        current_vault,
        current_vault_field
    } = state;

    const [loading, setLoading] = useState(false);

    const fetchAll = async () => {
        const data = await startupsService.fetchAllVaults();
        dispatch({
            type: "SET_VALUTS",
            payload: data.result
        });
        dispatch({
            type: "SET_VALUTS_COUNT",
            payload: data.result.length
        });
    }
    useEffect(() => {
        (async () => {
            dispatch({
                type: "SET_CURRENT_PAGE",
                payload: 'get-verified-badges'
            });

            dispatch({
                type: "SET_LOADING",
                payload: true
            });
            await fetchAll();
            dispatch({
                type: "SET_LOADING",
                payload: false
            });


        })();
    }, []);

    const viewFile = async (file_link) => {
        window.open(file_link, '_blank');
    }

    const action = async (vault, type, field) => {
        let field_name;
        switch (field) {
            case 'BU': field_name = 'Business Registration'
                break;

            case 'PD': field_name = 'Pitch Deck'
                break;

            case 'FI': field_name = 'Founder Infos'
                break;
        }
        dispatch({
            type: "SET_CURRENT_VAULT",
            payload: vault
        });
        dispatch({
            type: "SET_CURRENT_VAULT_FIELD",
            payload: field
        });
        if (type === "confirm") {
            //approveVault

            dispatch({
                type: "SET_LOADING",
                payload: true
            });

            let id;
            if (current_vault_field === 'BU') {
                id = current_vault.data[1].id
            } else if (current_vault_field === 'PD') {
                id = current_vault.data[0].id
            }
            else if (current_vault_field === 'FI') {
                id = current_vault.data[2].id
            }
            let data = {
                id,
                status: 2,
            }
            await startupsService.updateVault(data);

            await fetchAll()
            dispatch({
                type: "SET_LOADING",
                payload: false
            });
            toast.success('Confirmed successfully !!!', {
                position: toast.POSITION.TOP_RIGHT
            })
        } else if (type === "reject") {


            setModalTitle('Rejecting ' + vault.name + '\'s ' + field_name)
            dispatch({
                type: "SET_MODAL",
                payload: true
            });
            dispatch({
                type: "SET_MODAL_NAME",
                payload: "RejectingVault"
            });
        }
    }


    const closeModal = () => {
        dispatch({
            type: "SET_MODAL",
            payload: false
        })
        dispatch({
            type: "SET_MODAL_NAME",
            payload: ""
        })
    }



    const getStatus = (status) => {
        if (status === "1") {
            return "Under Review";
        } else if (status === "2") {
            return "Approved";
        } else if (status === "3") {
            return "Rejected";
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let id;
            if (current_vault_field === 'BU') {
                id = current_vault.data[1].id
            } else if (current_vault_field === 'PD') {
                id = current_vault.data[0].id
            }
            else if (current_vault_field === 'FI') {
                id = current_vault.data[2].id
            }
            let data = {
                id,
                status: 3,
                reason: reason
            }

            // console.log({ data })
            await startupsService.updateVault(data);

            await fetchAll()

            setReason('');
            setLoading(false)

            dispatch({
                type: "SET_MODAL",
                payload: false
            });

            dispatch({
                type: "SET_MODAL_NAME",
                payload: ""
            });

            toast.success('Rejected successfully !!!', {
                position: toast.POSITION.TOP_RIGHT
            })
        } catch (err) {
            setLoading(false)
            let message = err.message;
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT
            })

        }
    }

    return (
        <ProtectedRoute >
            <InnerMenu links={Links.StartupsLinks} />
            {loading && (<PageLoader />)}
            <div className="container-fluid">
                <div>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="breadcrumb-main user-member justify-content-sm-between ">
                                <BreadCrumb title={"Vaults Data"} count={vaults_count} />
                            </div>
                        </div>
                    </div>
                </div>
                {!loading && (
                    <div className="col-12 ">
                        <div className="contact-list-wrap mb-25">
                            <div className="contact-list bg-white radius-xl w-100">
                                <div className="table-responsive">
                                    <table className="table getVerifiedTable mb-0 table-borderless table-rounded table table-striped">
                                        <thead>
                                            <tr className="userDatatable-header">
                                                <th>
                                                    <span className="userDatatable-title">#</span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">User ID </span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">Startup </span>
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
                                            {vaults && vaults_count >= 1 && vaults.map(function (vault, index) {
                                                return (<tr key={index}>
                                                    <td>
                                                        <h6>
                                                            {++index}
                                                        </h6>
                                                    </td>
                                                    <td>
                                                        <h6>
                                                            {vault.user_id}
                                                        </h6>
                                                    </td>
                                                    <td>
                                                        <div className="contact-item d-flex align-items-center">
                                                            <div className="contact-personal-info d-flex">
                                                                <Avatar size={40} className="profile-image rounded-circle d-block m-0 wh-38"
                                                                    src={''} />
                                                                <div className="contact_title">
                                                                    <h6>
                                                                        {vault.name}
                                                                    </h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="userDatatable-content">
                                                            <div className="col-12 justify-content-around d-flex flex-column">
                                                                <div>
                                                                    <Button className="gvb-btn-view" type="primary" size="small" onClick={() => { viewFile(vault.data[1].value) }} icon={<EyeFilled />}>
                                                                        View
                                                                    </Button>
                                                                </div>
                                                                <div>
                                                                    <Button className="gvb-btn-confirm" type="primary" size="small" onClick={() => { action(vault, 'confirm', 'BU') }} icon={<CheckCircleFilled />}>
                                                                        Confirm
                                                                    </Button>
                                                                </div>
                                                                <div>
                                                                    <Button className="gvb-btn-reject" type="primary" size="small" onClick={() => { action(vault, 'reject', 'BU') }} icon={<CloseCircleFilled />}>
                                                                        Reject
                                                                    </Button>
                                                                </div>

                                                                <div>
                                                                    <Tag color="purple">Status : {getStatus(vault.data[1].status)}</Tag>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="userDatatable-content">
                                                            <div className="col-12 justify-content-around d-flex flex-column">
                                                                <div>
                                                                    <Button className="gvb-btn-view" type="primary" size="small" onClick={() => { viewFile(vault.data[0].value) }} icon={<EyeFilled />}>
                                                                        View
                                                                    </Button>
                                                                </div>
                                                                <div>
                                                                    <Button className="gvb-btn-confirm" type="primary" size="small" onClick={() => { action(vault, 'confirm', 'PD') }} icon={<CheckCircleFilled />}>
                                                                        Confirm
                                                                    </Button>
                                                                </div>
                                                                <div>
                                                                    <Button className="gvb-btn-reject" type="primary" size="small" onClick={() => { action(vault, 'reject', 'PD') }} icon={<CloseCircleFilled />}>
                                                                        Reject
                                                                    </Button>
                                                                </div>
                                                                <div>
                                                                    <Tag color="purple">Status : {getStatus(vault.data[0].status)}</Tag>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="userDatatable-content" rowspan="4">
                                                            <div className="col-md-12">
                                                                <p>
                                                                    Full Name:
                                                                    <span className="pull-right mx-1">
                                                                        {vault.data[2].founder_full_name}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <p>
                                                                    LinkedIn:
                                                                    <span className="pull-right">
                                                                        <Button className="gvb-btn-confirm" type="primary" size="small" onClick={() => { viewFile(vault.data[2].linked_in_url) }} icon={<CheckCircleFilled />}>
                                                                            View
                                                                        </Button>
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div className="col-md-12 btn-group">
                                                                <div >
                                                                    <Button className="gvb-btn-confirm" type="primary" size="small" onClick={() => { action(vault, 'confirm', 'FI') }} icon={<CheckCircleFilled />}>
                                                                        Confirm
                                                                    </Button>
                                                                </div>
                                                                <div className="mx-2">
                                                                    <Button className="gvb-btn-reject" type="primary" size="small" onClick={() => { action(vault, 'reject', 'FI') }} icon={<CloseCircleFilled />}>
                                                                        Reject
                                                                    </Button>
                                                                </div>

                                                            </div>
                                                            <div>
                                                                <Tag color="purple">Status : {getStatus(vault.data[2].status)}</Tag>
                                                            </div>

                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="userDatatable-content">
                                                            <span className="text-black gvb-status-accepted">
                                                                <p>-
                                                                    {/* <CheckCircleFilled color="red" />
                                                                    <span className="pull-right ml-1">
                                                                        Accepted
                                                                    </span> */}
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

                                                </tr>)

                                            })}


                                        </tbody>

                                    </table>

                                    {
                                        vaults && vaults.length < 1 && (
                                            <EmptyCard text="No Vault Data Found" />
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                    </div>

                )}
            </div>

            <Modal
                className="rejectDiasporaModal"
                destroyOnClose={true}
                centered={true}
                visible={modal_is_open && modal_name === "RejectingVault"}
                title={modalTitle}
                closeIcon={<CloseCircleFilled style={{ fontSize: '150%' }} />}
                onOk={closeModal}
                width={700}
                okText="Send"
                onCancel={closeModal}
                zIndex={9000}
                footer={null}
            >
                <div className="card-body pb-md-30" data-select2-id="28">
                    <form onSubmit={handleSubmit} className="myform form-outline">

                        <div className="form-group form-element-textarea mb-20">
                            <label for="exampleFormControlTextarea1" className="il-gray fs-14 fw-500 align-center required">Reason</label>
                            <textarea required rows={9} onChange={(e) => setReason(e.target.value)} className="form-control reason" id="exampleFormControlTextarea1">
                                {reason}
                            </textarea>
                        </div>

                        <div className="col text-center">
                            <button className="btn btn-submit" type="submit" disabled={loading}>
                                {loading ? (<span><SyncOutlined spin ></SyncOutlined> Loading ...</span>) : 'Send'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

        </ProtectedRoute>
    );
};

export default GetVerifiedBages;