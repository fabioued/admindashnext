import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import ProtectedRoute from "../../components/routes/protectedRoute"
import InnerMenu from "../../components/Navigation/InnerMenu";
import { Avatar, Tag, Modal } from 'antd'
import { CloseCircleFilled } from '@ant-design/icons';
import { Context } from "../../context/index"
import Moment from "react-moment";
import { getName as getCountryName } from "country-list";
import LoadMore from "../../components/loadMore/index"
import diasporaService from "../../services/diaspora/diasporaService";
import RejectDiaspora from "../../components/diaspora/RejectDiaspora";
import ViewSingDiasPora from "../../components/diaspora/ViewDiaspora";
import DeleteDiaspora from "../../components/diaspora/DeleteDiaspora";
import Filter from "../../components/filters/index";
// import { Calendar } from "react-multi-date-picker";
import Links from "../../lib/innerMenu";

const confirmedDiaspora = () => {
    const { state, dispatch } = useContext(Context);
    const [modalTitle, setModalTitle] = useState('');
    const {
        loading, confirmed_diaspora, confirmed_diaspora_count,
        modal_is_open, modal_name,
        page, pagination, has_more_data
    } = state;

    let type = 0;

    useEffect(() => {
        (async () => {
            const data = await diasporaService.fetchRecords(page, pagination, type);
            dispatch({
                type: "CONFIRMED_DIASPORA",
                payload: data.diaspora
            });
            dispatch({
                type: "CONFIRMED_DIASPORA_COUNT",
                payload: data.count
            });

            dispatch({
                type: "SET_CURRENT_PAGE",
                payload: 'confirmed-diaspora'
            });
            data.count > 0 ? dispatch({ type: "SET_HAS_MORE_DATA", payload: true }) : dispatch({ type: "SET_HAS_MORE_DATA", payload: false })
        })();
    }, []);

    const viewDiaspora = async (diaspora) => {
        const payload = {
            id: diaspora?.users_id,
        };
        const user = await diasporaService.fetchSingleRecord(payload);
        dispatch({
            type: "SET_VIEWING_USER",
            payload: user
        });

        setModalTitle('Viewing Diaspora  ' + diaspora?.users_firstname + ' ' + diaspora?.users_name)
        dispatch({
            type: "SET_MODAL",
            payload: true
        });
        dispatch({
            type: "SET_MODAL_NAME",
            payload: "ViewDiaspora"
        });
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

    const rejectDiaspora = (diaspora) => {

        dispatch({
            type: "SET_VIEWING_USER",
            payload: diaspora
        });
        setModalTitle('Rejecting Diaspora:  ' + diaspora?.users_firstname + ' ' + diaspora?.users_name)
        dispatch({
            type: "SET_MODAL",
            payload: true
        });
        dispatch({
            type: "SET_MODAL_NAME",
            payload: "RejectDiaspora"
        });

    }

    const deletedDiaspora = (diaspora) => {
        dispatch({
            type: "SET_VIEWING_USER",
            payload: diaspora
        });
        setModalTitle('Deleting Diaspora:  ' + diaspora?.users_firstname + ' ' + diaspora?.users_name)
        dispatch({
            type: "SET_MODAL",
            payload: true
        });
        dispatch({
            type: "SET_MODAL_NAME",
            payload: "DeleteDiaspora"
        });
    }

    return (
        <>
            <InnerMenu links={Links.DiasporaLinks} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="breadcrumb-main user-member justify-content-sm-between ">
                            <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                <div className="d-flex align-items-center user-member__title justify-content-center mr-sm-25">
                                    <h4 className="text-capitalize fw-500 breadcrumb-title pl-3">Confirmed Diaspora ({confirmed_diaspora_count})</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <Filter />
                    </div>
                </div>
                <div className="col-12">
                    <div className="contact-list-wrap mb-25">
                        <div className="contact-list bg-white radius-xl w-100">
                            <div className="table-responsive">
                                <table className="table mb-0 table-borderless table-rounded table table-striped">
                                    <thead>
                                        <tr className="userDatatable-header">
                                            <th>
                                                <span className="userDatatable-title">id </span>
                                            </th>
                                            <th>
                                                <span className="userDatatable-title">Name</span>
                                            </th>
                                            <th>
                                                <span className="userDatatable-title">From</span>
                                            </th>
                                            <th>
                                                <span className="userDatatable-title">Lives In</span>
                                            </th>
                                            <th data-type="html" data-name="position">
                                                <span className="userDatatable-title">Joined</span>
                                            </th>
                                            <th>
                                                <span className="userDatatable-title">Language</span>
                                            </th>
                                            <th>
                                                <span className="userDatatable-title float-right">Action</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {confirmed_diaspora && confirmed_diaspora.length >= 1 && confirmed_diaspora.map(function (diaspora, index) {
                                            return (<tr key={index}>
                                                <td>
                                                    <div className="userDatatable-content">{diaspora.users_id}</div>
                                                </td>
                                                <td>
                                                    <div className="contact-item d-flex align-items-center">
                                                        <div className="contact-personal-info d-flex">
                                                            <Avatar size={40} className="profile-image rounded-circle d-block m-0 wh-38" src={diaspora.users_avatar ? diaspora.users_avatar : ''} />
                                                            <div className="contact_title">
                                                                <h6>
                                                                    {diaspora?.users_firstname + ' ' + diaspora?.users_name}
                                                                </h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="com-name">{diaspora.profile_birthCountry ? getCountryName(diaspora.profile_birthCountry) : '-'}</span>
                                                </td>

                                                <td>
                                                    <span className="com-name">{diaspora.profile_residenceContry ? getCountryName(diaspora.profile_residenceContry) : '-'}</span>
                                                </td>
                                                <td>
                                                    <span className="com-name"><Moment format="DD/MM/YYYY">
                                                        {diaspora.users_created_at}
                                                    </Moment></span>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-content d-inline-block">

                                                        {diaspora.profile_preferedLanguage ? (diaspora.profile_preferedLanguage === 'en' ? <Tag color="cyan">English</Tag> : <Tag color="purple">French</Tag>) : <Tag color="red">Not Defined</Tag>}
                                                    </div>
                                                </td>
                                                <td className="footable-last-visible">
                                                    <div className="btn-group">
                                                        <span onClick={() => viewDiaspora(diaspora)} className="media-badge color-white bg-info mx-1">View</span>
                                                        <span onClick={() => rejectDiaspora(diaspora)} className="media-badge color-white bg-secondary mx-1">Reject</span>
                                                        <span onClick={() => deletedDiaspora(diaspora)} className="media-badge color-white bg-danger mx-1">Delete</span>
                                                    </div>
                                                </td>
                                            </tr>)

                                        })}

                                        {confirmed_diaspora && confirmed_diaspora.length < 1 && (
                                            <tr>
                                                <td colSpan="7" className="text-center">
                                                    No confirmed diaspora
                                                </td>
                                            </tr>
                                        )}

                                    </tbody>

                                </table>

                            </div>
                        </div>
                    </div>
                </div>

                {has_more_data && (
                    <LoadMore type="confirmed-diaspora" />
                )}
                <Modal
                    className="diasporaModal"
                    destroyOnClose={true}
                    centered={true}
                    visible={modal_is_open && modal_name === "ViewDiaspora"}
                    title={modalTitle}
                    closeIcon={<CloseCircleFilled style={{ fontSize: '150%' }} />}
                    onOk={closeModal}
                    onCancel={closeModal}
                    width={1000}
                    bodyStyle={{ overflowX: 'scroll' }}
                    zIndex={9000}
                    footer={null}

                >
                    <ViewSingDiasPora />
                </Modal>


                <Modal
                    className="rejectDiasporaModal"
                    destroyOnClose={true}
                    centered={true}
                    visible={modal_is_open && modal_name === "RejectDiaspora"}
                    title={modalTitle}
                    closeIcon={<CloseCircleFilled style={{ fontSize: '150%' }} />}
                    onOk={closeModal}
                    width={700}
                    okText="Send"
                    onCancel={closeModal}
                    zIndex={9000}
                    footer={null}
                >
                    <RejectDiaspora />
                </Modal>


                <Modal
                    className="deleteDiasporaModal"
                    destroyOnClose={true}
                    centered={true}
                    visible={modal_is_open && modal_name === "DeleteDiaspora"}
                    title={modalTitle}
                    closeIcon={<CloseCircleFilled style={{ fontSize: '150%' }} />}
                    width={680}
                    onCancel={closeModal}
                    zIndex={9000}
                    footer={null}
                >
                    <DeleteDiaspora />
                </Modal>
            </div>
        </>
    );
};

export default confirmedDiaspora;