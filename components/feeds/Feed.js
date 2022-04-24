import { useContext, useState } from "react";
import { Modal, Alert, Button, Tag } from 'antd';
import { Context } from "../../context/index"
import Image from "next/image"
import { toast } from "react-toastify"
import { SyncOutlined, UserOutlined, ClockCircleFilled, GlobalOutlined, LockFilled, RocketOutlined } from '@ant-design/icons';
import diasporaService from "../../services/diaspora/diasporaService";
import { Calendar } from 'react-feather';
const Feed = ({ feed }) => {
    // const { state, dispatch } = useContext(Context);
    // const [reason, setReason] = useState("");
    // const [id, setId] = useState(0);
    // const { viewing_user, confirmed_diaspora, confirmed_diaspora_count } = state;
    // const [loading, setLoading] = useState(false);
    let postCol = 8;

    if (feed.images.length < 1) {
        postCol = 12;
    }
    const approuveFeed = () => {
        alert('approuveFeed')
    }

    const rejectFeed = () => {
        alert('rejectFeed')
    }

    const deleteFeed = () => {
        alert('deleteFeed')
    }

    // id = viewing_user.users_id;
    // let message = "Are you sure you want to delete ? You can't undo this action.";

    // const deleteDiaspora = async (e) => {
    //     try {
    //         setLoading(true)
    //         await diasporaService.deleteRecord(id);
    //         let newRecords = confirmed_diaspora.filter(function (diaspora) {
    //             return diaspora.users_id != id
    //         });
    //         dispatch({
    //             type: "CONFIRMED_DIASPORA",
    //             payload: newRecords
    //         });
    //         dispatch({
    //             type: "CONFIRMED_DIASPORA_COUNT",
    //             payload: newRecords.length
    //         });

    //         setLoading(false)

    //         dispatch({
    //             type: "SET_MODAL",
    //             payload: true
    //         });

    //         dispatch({
    //             type: "SET_MODAL_NAME",
    //             payload: ""
    //         });

    //     } catch (err) {
    //         setLoading(false)
    //         let message = err.message;
    //         toast.error(message, {
    //             position: toast.POSITION.TOP_RIGHT,
    //         })

    //     }
    // }

    // const closeModal = () => {
    //     dispatch({
    //         type: "SET_MODAL",
    //         payload: false
    //     })
    //     dispatch({
    //         type: "SET_MODAL_NAME",
    //         payload: ""
    //     })
    // }
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
                                </div>
                                <div className="col-md-6 mb-3" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {feed.user.type === 1 && <Tag icon={<UserOutlined className="feed-icon-diaspora" />} color="cyan">Diaspora</Tag>}
                                    {feed.user.type === 2 && <Tag icon={<RocketOutlined className="feed-icon-startup" />} color="geekblue">Startup</Tag>}
                                </div>
                                <div className="col-md-6 feed-title">
                                    {feed.user ? feed.user.firstname + ' ' + feed.user.name : '-'}
                                </div>
                                <div className="col-md-6" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Calendar className="mx-1" size={18} />
                                    {feed.created_at}
                                </div>
                            </div>
                        </div>
                        <div className="panel-body">
                            <div className="row mt-2">
                                <div className={`col-md-${postCol}`}>
                                    <p className="feed-content">{feed.post}</p>
                                </div>
                                {feed.images.length >= 1 &&

                                    (<div className="col-md-4">
                                        <Image src={feed.images[0].image}
                                            alt="Picture of the feed"
                                            width={653}
                                            height={453}
                                            className="align-self-center radius-xl"
                                        />
                                    </div>)
                                }

                            </div>

                            <div className="button-group">
                                <Button block className="feed-approve" onClick={() => approuveFeed()}>Approve</Button>
                                <Button block className="feed-reject" onClick={() => rejectFeed()}>Reject</Button>
                                <Button block className="feed-delete" onClick={() => deleteFeed()}>Delete</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Feed;


