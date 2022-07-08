import { useContext, useState } from "react";
import { Modal, Alert, Button, Tag, Space } from 'antd';
import { Context } from "../../context/index"
import Image from "next/image"
import { toast } from "react-toastify"
import { SyncOutlined, CloseCircleFilled, UserOutlined, ClockCircleFilled, WarningFilled, GlobalOutlined, LockFilled, RocketOutlined, TranslationOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import feedService from "../../services/feeds/feedService";
import { Calendar, Globe } from 'react-feather';
import Moment from "react-moment";


const Feed = ({ feed, hideApprove, hideReject, hideDelete }) => {
    const { state, dispatch } = useContext(Context);
    const [reason, setReason] = useState("");
    const [id, setId] = useState(0);
    const { feeds, feeds_count, modal_is_open, modal_name } = state;
    const [loading, setLoading] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    let postCol = 8;

    if (feed.images.length < 1) {
        postCol = 12;
    }
    const approuveFeed = async () => {
        try {
            setLoading(true)
            let id = feed.id;

            const data = await feedService.approveFeed(id);
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

            setLoading(false)

            toast.success('The feed has been approved successfully !!!', {
                position: toast.POSITION.TOP_RIGHT
            })
        } catch (err) {
            setLoading(false)
            let message = err.message;
            // console.log({ err });
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT
            })

        }

    }

    const rejectFeed = async () => {
        try {
            setLoading(true)
            let id = feed.id;
            const data = await feedService.rejectFeed(id);
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
            setLoading(false);
            toast.success('The feed has been rejected successfully !!!', {
                position: toast.POSITION.TOP_RIGHT
            })
        } catch (err) {
            setLoading(false)
            let message = err.message;
            // console.log({ err });
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT
            })

        }
    }

    const showModal = async (feed) => {
        dispatch({
            type: "SET_CURRENT_FEED",
            payload: feed
        })
        dispatch({
            type: "SET_MODAL_TITLE",
            payload: 'Delete Feed  ' + feed?.id
        })
        dispatch({
            type: "SET_MODAL",
            payload: true
        })
        dispatch({
            type: "SET_MODAL_NAME",
            payload: "DeleteFeed"
        })
    }

    return (
        <>
            <div className="col-6 mb-5">
                <div className="panel-group feed-panel p-3">
                    <div className="panel">
                        <div className="panel-heading">
                            <div className="row mb-1">
                                <div className="col-md-6 mb-3">
                                    {feed.hide === 1 && <Tag icon={< LockFilled className="feed-icon-hidden" />} color="red">Hidden</Tag>}
                                    {feed.hide === 0 && <Tag icon={<GlobalOutlined className="feed-icon-public" />} color="purple">Public</Tag>}
                                    {/* <Tag icon={<ClockCircleFilled className="feed-icon-pending" />} color="gold">Pending</Tag> */}
                                    {feed.user && <Tag icon={<TranslationOutlined className="feed-icon-pending" />} color="gold">{feed.lang === 'en' ? "Englsih" : "French"}</Tag>}
                                </div>
                                <div className="col-md-6 mb-3" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {feed.user.confirmed === 0 && <Tag icon={< UserOutlined className="feed-icon-hidden" />} color="red">Non Approved User</Tag>}
                                    {feed.user.confirmed === 1 && <Tag icon={<UserOutlined className="feed-icon-public" />} color="purple">Approved User</Tag>}

                                    {feed.user && feed.user.type === 1 && <Tag icon={<UserOutlined className="feed-icon-diaspora" />} color="cyan">Diaspora</Tag>}
                                    {feed.user && feed.user.type === 2 && <Tag icon={<RocketOutlined className="feed-icon-startup" />} color="geekblue">Startup</Tag>}

                                </div>
                                <div className="col-md-6 feed-title">
                                    {feed.user ? feed.user.firstname + ' ' + feed.user.name : '-'}
                                </div>
                                <div className="col-md-6" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Calendar className="mx-1" size={18} />
                                    <Moment format="MMMM Do, YYYY HH:mm">
                                        {feed.created_at}
                                    </Moment>
                                </div>
                            </div>
                        </div>
                        <div className="panel-body">
                            <div className="row mt-2">
                                <div className={`col-md-12 ${postCol} feed`}>
                                    {feed.images.length >= 1 &&

                                        (<div className="image-container">
                                            <img src={feed.images[0] ? feed.images[0].image : ''}
                                                alt="Picture of the feed"
                                                className="align-self-center radius-xl"
                                            />
                                        </div>)
                                    }
                                    <p className="feed-content">{feed.post}</p>
                                </div>
                            </div>

                            <div className="button-group">
                                {!hideApprove && <Button block className="feed-approve" onClick={() => approuveFeed()}>Approve</Button>}
                                {!hideReject && <Button block className="feed-reject" onClick={() => rejectFeed()}>Reject</Button>}
                                {!hideDelete && <Button block className="feed-delete" onClick={() => showModal(feed)}>Delete</Button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Feed;


