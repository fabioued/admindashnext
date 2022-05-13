import InnerMenu from "../../components/Navigation/InnerMenu";
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../context/index"
import Feed from "../../components/feeds/Feed"
import feedService from "../../services/feeds/feedService";
import Filter from "../../components/filters/index";
import BreadCrumb from "../../components/Navigation/Breadcrumb"
import BreadcrumbButton from "../../components/Navigation/BreadcrumbButton";
import Links from "../../lib/innerMenu"
import EmptyCard from "../../components/empty/Card";
import LoadMore from "../../components/loadMore/index"
import PageLoader from '../../components/loaders/PageLoader'
import { Modal, Alert, Button, Tag, Space } from 'antd';
import { SyncOutlined, CloseCircleFilled, WarningFilled } from '@ant-design/icons';
import { toast } from "react-toastify"
import ProtectedRoute from "../../components/routes/protectedRoute"


const Feeds = () => {
    const { state, dispatch } = useContext(Context);
    let { current_page, feeds, feeds_count, page, pagination,
        has_more_data, loading, modal_is_open, modal_name, modal_title, current_feed
    } = state;
    // pagination = 10;
    const [buttonLoading, setButtonLoading] = useState(false);
    let [lang, setLang] = useState('en');
    let type = 0;
    lang = "en";
    useEffect(() => {
        (async () => {
            dispatch({
                type: "SET_LOADING",
                payload: true
            });
            const data = await feedService.fetchFeeds({
                page, pagination, type, lang
            });
            dispatch({
                type: "SET_FEEDS",
                payload: data.feeds
            });
            dispatch({
                type: "SET_FEEDS_COUNT",
                payload: data.count
            });

            dispatch({
                type: "SET_CURRENT_PAGE",
                payload: 'approved-feeds'
            });
            (data.count && data.count <= data.totalCount) ? dispatch({ type: "SET_HAS_MORE_DATA", payload: true }) : dispatch({ type: "SET_HAS_MORE_DATA", payload: false })
            dispatch({
                type: "SET_LOADING",
                payload: false
            });
        })();
    }, []);

    const closeModal = () => {
        dispatch({
            type: "SET_MODAL_NAME",
            payload: ""
        })
        dispatch({
            type: "SET_MODAL",
            payload: false
        })
        dispatch({
            type: "SET_MODAL_NAME",
            payload: ""
        })
    }

    let message = "Are you sure you want to delete ? You can't undo this action.";
    const deleteFeed = async () => {
        try {
            setButtonLoading(true)
            let id = current_feed.id;
            await feedService.deleteFeed(id);
            let newRecords = feeds.filter(function (feed) {
                return feed.id != id
            });
            dispatch({
                type: "SET_FEEDS",
                payload: newRecords
            });
            dispatch({
                type: "SET_FEEDS_COUNT",
                payload: newRecords.length
            });

            setButtonLoading(false)

            dispatch({
                type: "SET_MODAL",
                payload: false
            });

            dispatch({
                type: "SET_MODAL_NAME",
                payload: ""
            });

            toast.success('The feed has been deleted successfully !!!', {
                position: toast.POSITION.TOP_RIGHT
            })

        } catch (err) {
            setButtonLoading(false)
            let message = err.message;
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT,
            })

        }
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
            type,
            lang
        };
        const data = await feedService.loadMoreRecords(payload);
        let count = feeds_count + data.count;
        dispatch({
            type: "SET_FEEDS",
            payload: [...feeds, ...data.feeds]
        });

        dispatch({
            type: "SET_FEEDS_COUNT",
            payload: count
        });

        // if (count < data.totalCount && count === pagination) {
        //     dispatch({ type: "SET_HAS_MORE_DATA", payload: true })
        // }
        // if (count === data.totalCount) {
        //     dispatch({ type: "SET_HAS_MORE_DATA", payload: false })
        // }

        (data.count && data.count === pagination && data.count <= data.totalCount) ? dispatch({ type: "SET_HAS_MORE_DATA", payload: true }) : dispatch({ type: "SET_HAS_MORE_DATA", payload: false })
        setButtonLoading(false)
    }

    return (
        <ProtectedRoute>
            <InnerMenu links={Links.feedsLinks} />
            {loading && (<PageLoader />)}
            {!loading && (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="breadcrumb-main user-member justify-content-sm-between ">
                                <BreadCrumb title={"Approved Feeds"} count={feeds_count} />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <Filter filterType='lang' />
                        </div>
                    </div>
                    <div className="row">
                        {feeds && feeds.length > 0 && (feeds.map((feed, index) => {
                            return <Feed key={index} feed={feed} hideApprove={true} />
                        }))}

                        {
                            feeds.length <= 0 && (<EmptyCard text="No Records Found" />)
                        }
                        {has_more_data && (
                            <div onClick={loadMore} >
                                <LoadMore loading={loading} />
                            </div>
                        )}
                    </div>

                    <Modal
                        className="deleteDiasporaModal"
                        visible={modal_is_open && modal_name === "DeleteFeed"}
                        title={modal_title}
                        destroyOnClose={true}
                        centered={true}
                        onCancel={closeModal}
                        closeIcon={<CloseCircleFilled style={{ fontSize: '150%' }} />}
                        width={680}
                        zIndex={9000}
                        footer={null}>
                        <div className="card-body">
                            <div className="container justify-content-center">
                                <div className="row ">
                                    <div className="col-md-12 pb-md-30">
                                        <div className="alert-icon-area alert alert-danger-custom" role="alert">
                                            <div className="alert-icon">
                                                <WarningFilled style={{ color: "#F35627" }} />
                                            </div>
                                            <div className="alert-content">
                                                <p>{message}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 pt-md-30">
                                            <button type="button" className="btn btn-cancel" onClick={closeModal}>Cancel</button>
                                        </div>
                                        <div className="col-md-6 pt-md-30">
                                            <button className="btn btn-delete" type="button" onClick={() => deleteFeed()}>
                                                {buttonLoading ? (<span><SyncOutlined spin ></SyncOutlined> Deleting ...</span>) : 'Delete'}
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </Modal>

                </div>)}

        </ProtectedRoute>
    );
};

export default Feeds;