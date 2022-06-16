import { useContext, useState } from "react";
import { Modal, Alert, Button, Tag, Space } from 'antd';
import { Context } from "../../context/index"
import Image from "next/image"
import { toast } from "react-toastify"
import { SyncOutlined, CloseCircleFilled, UserOutlined, ClockCircleFilled, WarningFilled, GlobalOutlined, LockFilled, RocketOutlined, TranslationOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import feedService from "../../services/feeds/feedService";
import { Calendar, Globe } from 'react-feather';
import Moment from "react-moment";


const PressCard = ({ blog }) => {
    const { state, dispatch } = useContext(Context);
    const [reason, setReason] = useState("");
    const [id, setId] = useState(0);
    const { feeds, feeds_count, modal_is_open, modal_name } = state;
    const [loading, setLoading] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    let postCol = 8;


    const showModal = async (blog) => {
        dispatch({
            type: "SET_CURRENT_BLOG",
            payload: blog
        })
        dispatch({
            type: "SET_MODAL_TITLE",
            payload: 'Viewing Blog:  ' + blog?.title
        })
        dispatch({
            type: "SET_MODAL",
            payload: true
        })
        dispatch({
            type: "SET_MODAL_NAME",
            payload: "viewBlog"
        })
    }

    const showDeleteBlogModal = async (blog) => {
        dispatch({
            type: "SET_CURRENT_BLOG",
            payload: blog
        })
        dispatch({
            type: "SET_MODAL_TITLE",
            payload: 'Deleting Blog:  ' + blog?.title
        })
        dispatch({
            type: "SET_MODAL",
            payload: true
        })
        dispatch({
            type: "SET_MODAL_NAME",
            payload: "deleteBlog"
        })
    }

    return (
        <>

            <div className="cus-xl-4 col-lg-4 col-md-12 col-sm-6 col-12 mb-30">
                <div className="card bookmark bookmark--grid">
                    <div className="bookmark__image">
                        <img className="card-img-top img-fluid" src={blog.image_url} />
                    </div>
                    <div className="card-body px-15 py-20">
                        <div className="row">
                            <div className="col-md-5">Visibility: <Tag color="cyan" className="my-2">{blog.show_post ? 'visible' : 'hidden'}</Tag></div>
                            <div className="col-md-7">Author: <Tag color="purple" className="my-2">{blog.author}</Tag></div>
                        </div>
                        <div className="bookmark__body py-1 text-capitalize">
                            <h6 className="card-title mb-3">{blog.title}</h6>
                        </div>
                        <div className="bookmark__button py-20  mt-15 flex-wrap">
                            <div className="button-group">

                                {<a href={blog.press_source} target="_blank" className="btn-block  text-center feed-approve" >
                                    <span className="link-text">View</span></a>}
                                {/* {<Button block className="feed-reject" onClick={() => showModal(blog)}>Edit</Button>} */}
                                {<Button block className="feed-delete" onClick={() => showDeleteBlogModal(blog)}>Delete</Button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default PressCard;

