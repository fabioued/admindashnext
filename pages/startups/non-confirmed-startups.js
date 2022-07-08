import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import InnerMenu from "../../components/Navigation/InnerMenu";
import { Avatar, Tag, Modal } from 'antd'
import { CloseCircleFilled } from '@ant-design/icons';
import { Context } from "../../context/index"
import Moment from "react-moment";
import { getName as getCountryName } from "country-list";
import LoadMore from "../../components/loadMore/index"
import startupsService from "../../services/startups/startupsService";
import RejectStartup from "../../components/startups/RejectStartup";
import ViewStartup from "../../components/startups/ViewStartup";
import DeleteStartup from "../../components/startups/DeleteStartup";
import Filter from "../../components/filters/index";
import BreadCrumb from "../../components/Navigation/Breadcrumb"
import PageLoader from '../../components/loaders/PageLoader'
import ProtectedRoute from "../../components/routes/protectedRoute"

// import { Calendar } from "react-multi-date-picker";
import Links from "../../lib/innerMenu";

const nonConfirmedStartups = () => {
    const { state, dispatch } = useContext(Context);
    const [modalTitle, setModalTitle] = useState('');
    const {
        loading, startups, startups_count,
        modal_is_open, modal_name,
        page, pagination, has_more_data, total_count
    } = state;

    const [buttonLoading, setButtonLoading] = useState(false);

    let type = 0;

    useEffect(() => {
        (async () => {
            page = 0;
            dispatch({
                type: "SET_LOADING",
                payload: true
            });
            const data = await startupsService.fetchRecords(page, pagination, type);
            let count = startups_count + data.count;
            dispatch({
                type: "SET_TOTAL_COUNT",
                payload: data.totalCount
            });
            dispatch({
                type: "SET_STARTUPS",
                payload: data.startups
            });
            dispatch({
                type: "SET_STARTUPS_COUNT",
                payload: data.count
            });

            dispatch({
                type: "SET_CURRENT_PAGE",
                payload: 'non-confirmed-startups'
            });

            if (count < data.totalCount) {
                dispatch({ type: "SET_HAS_MORE_DATA", payload: true })
            }
            if (count === data.totalCount) {
                dispatch({ type: "SET_HAS_MORE_DATA", payload: false })
            }

            dispatch({
                type: "SET_LOADING",
                payload: false
            });
        })();
    }, []);

    const viewStartup = async (startup) => {
        const payload = {
            id: startup?.startups_id,
        };
        const singleStartup = await startupsService.fetchSingleRecord(payload);
        // console.log({ singleStartup })
        dispatch({
            type: "SET_VIEWING_STARTUP",
            payload: singleStartup
        });

        setModalTitle('Viewing Startup:  ' + startup?.startups_startupname)
        dispatch({
            type: "SET_MODAL",
            payload: true
        });
        dispatch({
            type: "SET_MODAL_NAME",
            payload: "ViewStartup"
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

    const confirmStartup = async (startup) => {
        let id = startup.startups_id;
        console.log({
            id
        })
        await startupsService.confirmStartup(id);
        let newRecords = startups.filter(function (startup) {
            return startup.startups_id != id
        });
        dispatch({
            type: "SET_STARTUPS",
            payload: newRecords
        });
        dispatch({
            type: "SET_STARTUPS_COUNT",
            payload: newRecords.length
        });
    }


    const deletedStartup = (startup) => {
        dispatch({
            type: "SET_VIEWING_STARTUP",
            payload: startup
        });
        setModalTitle('Deleting Startup:  ' + startup?.startups_startupname)
        dispatch({
            type: "SET_MODAL",
            payload: true
        });
        dispatch({
            type: "SET_MODAL_NAME",
            payload: "DeleteStartup"
        });
    }

    const loadMore = async () => {
        setButtonLoading(true)

        dispatch({
            type: "SET_PAGE",
            payload: ++page
        });
        const payload = {
            page,
            pagination,
            type
        };
        const data = await startupsService.loadMoreRecords(payload);
        let count = startups_count + data.count;
        dispatch({
            type: "SET_STARTUPS",
            payload: [...startups, ...data.startups]
        });

        dispatch({
            type: "SET_STARTUPS_COUNT",
            payload: count
        });

        if (count < data.totalCount) {
            dispatch({ type: "SET_HAS_MORE_DATA", payload: true })
        }
        if (count === data.totalCount) {
            dispatch({ type: "SET_HAS_MORE_DATA", payload: false })
        }

        setButtonLoading(false)
    }

    return (
        <ProtectedRoute>
            <InnerMenu links={Links.StartupsLinks} />
            {loading && (<PageLoader />)}
            <div className="container2">
                {!loading && (
                    <div>
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="breadcrumb-main user-member justify-content-sm-between ">
                                    <BreadCrumb title={"Non Confirmed Startups"} count={startups_count} />
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <Filter filterType='calendar' />
                            </div>
                        </div>

                        <div className="col-12 ">
                            <div className="contact-list-wrap mb-25">
                                <div className="contact-list bg-white radius-xl w-100">
                                    <div className="table-responsive">
                                        <table className="table tableClass mb-0 table-borderless table-rounded table table-striped">
                                            <thead>
                                                <tr className="userDatatable-header">
                                                    <th>
                                                        <span className="userDatatable-title">#</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">ID </span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">Startup Name</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">Sector</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">Location</span>
                                                    </th>
                                                    <th data-type="html" data-name="position">
                                                        <span className="userDatatable-title">Joined</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title">Language</span>
                                                    </th>
                                                    <th>
                                                        <span className="userDatatable-title float-right">Actions</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {startups && startups.length >= 1 && startups.map(function (startup, index) {
                                                    return (<tr key={index}>
                                                        <td>
                                                            <div className="userDatatable-content">{++index}</div>
                                                        </td>
                                                        <td>
                                                            <div className="userDatatable-content">{startup.startups_id}</div>
                                                        </td>
                                                        <td>
                                                            <div className="contact-item d-flex align-items-center">
                                                                <div className="contact-personal-info d-flex">
                                                                    <Avatar size={40} className="profile-image rounded-circle d-block m-0 wh-38" src={startup.user_avatar ? startup.user_avatar : ''} />
                                                                    <div className="contact_title">
                                                                        <h6>
                                                                            {startup?.startups_startupname}
                                                                        </h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="com-name">{startup.startups_sector}</span>
                                                        </td>

                                                        <td>
                                                            <span className="com-name">{startup.startups_location ? getCountryName(startup.startups_location) : '-'}</span>
                                                        </td>
                                                        <td>
                                                            <span className="com-name"><Moment format="DD/MM/YYYY">
                                                                {startup.startups_created_at}
                                                            </Moment></span>
                                                        </td>
                                                        <td>
                                                            <div className="userDatatable-content d-inline-block">

                                                                {startup.startupProfile_preferedLanguage ? (startup.startupProfile_preferedLanguage === 'en' ? <Tag color="cyan">English</Tag> : <Tag color="purple">French</Tag>) : <Tag color="red">Not Defined</Tag>}
                                                            </div>
                                                        </td>
                                                        <td className="footable-last-visible">
                                                            <div className="btn-group">
                                                                <span onClick={() => viewStartup(startup)} className="media-badge color-white bg-info mx-1">View</span>
                                                                <span onClick={() => confirmStartup(startup)} className="media-badge color-white bg-success mx-1">Conifrm</span>
                                                                <span onClick={() => deletedStartup(startup)} className="media-badge color-white bg-danger mx-1">Delete</span>
                                                            </div>
                                                        </td>
                                                    </tr>)

                                                })}

                                                {startups && startups.length < 1 && (
                                                    <tr>
                                                        <td colSpan="7" className="text-center">
                                                            No non confirmed Startups
                                                        </td>
                                                    </tr>
                                                )}

                                            </tbody>

                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {!loading && has_more_data && (
                    <div onClick={loadMore} >
                        <LoadMore />
                    </div>
                )}

                <Modal
                    className="diasporaModal"
                    destroyOnClose={true}
                    centered={true}
                    visible={modal_is_open && modal_name === "ViewStartup"}
                    title={modalTitle}
                    closeIcon={<CloseCircleFilled style={{ fontSize: '150%' }} />}
                    onOk={closeModal}
                    onCancel={closeModal}
                    width={1000}
                    bodyStyle={{ overflowX: 'scroll' }}
                    zIndex={9000}
                    footer={null}

                >
                    <ViewStartup />
                </Modal>


                <Modal
                    className="rejectDiasporaModal"
                    destroyOnClose={true}
                    centered={true}
                    visible={modal_is_open && modal_name === "RejectStartup"}
                    title={modalTitle}
                    closeIcon={<CloseCircleFilled style={{ fontSize: '150%' }} />}
                    onOk={closeModal}
                    width={700}
                    okText="Send"
                    onCancel={closeModal}
                    zIndex={9000}
                    footer={null}
                >
                    <RejectStartup />
                </Modal>


                <Modal
                    className="deleteDiasporaModal"
                    destroyOnClose={true}
                    centered={true}
                    visible={modal_is_open && modal_name === "DeleteStartup"}
                    title={modalTitle}
                    closeIcon={<CloseCircleFilled style={{ fontSize: '150%' }} />}
                    width={680}
                    onCancel={closeModal}
                    zIndex={9000}
                    footer={null}
                >
                    <DeleteStartup />
                </Modal>
            </div>
        </ProtectedRoute>
    );
};

export default nonConfirmedStartups;