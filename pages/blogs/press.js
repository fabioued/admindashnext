import InnerMenu from "../../components/Navigation/InnerMenu";
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../context/index"
import PressCard from "../../components/blogs/PressCard"
import blogsService from "../../services/blogs/blogsService";
import BreadCrumb from "../../components/Navigation/Breadcrumb"
import BreadcrumbButton from "../../components/Navigation/BreadcrumbButton";
import Links from "../../lib/innerMenu"
import EmptyCard from "../../components/empty/Card";
import PageLoader from '../../components/loaders/PageLoader'
import { Modal, Alert, Button, Tag, Space } from 'antd';
import { SyncOutlined, CloseCircleFilled, WarningFilled } from '@ant-design/icons';
import { toast } from "react-toastify"
import ProtectedRoute from "../../components/routes/protectedRoute"


const Press = () => {
    const { state, dispatch } = useContext(Context);
    let { current_page, press, press_count, page, pagination,
        loading, modal_is_open, modal_name, modal_title, current_press
    } = state;
    const [buttonLoading, setButtonLoading] = useState(false);
    let [lang, setLang] = useState('en');
    lang = "en";
    useEffect(() => {
        (async () => {
            dispatch({
                type: "SET_LOADING",
                payload: true
            });
            const data = await blogsService.fetchAllPress();
            dispatch({
                type: "SET_PRESS",
                payload: data
            });
            dispatch({
                type: "SET_PRESS_COUNT",
                payload: data.length
            });

            dispatch({
                type: "SET_CURRENT_PAGE",
                payload: 'all-press'
            });
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
    const deleteBlog = async () => {
        try {
            setButtonLoading(true)
            let id = current_press.id;
            await blogsService.deleteBlog(id);
            let newRecords = blogs.filter(function (blog) {
                return blog.id != id
            });
            dispatch({
                type: "SET_PRESS",
                payload: newRecords
            });
            dispatch({
                type: "SET_PRESS_COUNT",
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

            toast.success('The press has been deleted successfully !!!', {
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

    return (
        <ProtectedRoute>
            <InnerMenu links={Links.blogsLinks} />
            {loading && (<PageLoader />)}
            {!loading && (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="breadcrumb-main user-member justify-content-sm-between ">
                                <BreadCrumb title={"Manange Press"} count={press_count} />
                            </div>
                        </div>
                    </div>
                    <div className="bookmark-page__list">
                        <div className="row mx-n1">
                            {press && press.length > 0 && (press.map((press_article, index) => {
                                return <PressCard key={index} blog={press_article
                                } />
                            }))}
                            {
                                press.length <= 0 && (<EmptyCard text="No Records Found" />)
                            }
                        </div>
                    </div>
                    <Modal
                        className="viewNewsArticleModal"
                        visible={modal_is_open && modal_name === "viewBlog"}
                        title={modal_title}
                        destroyOnClose={true}
                        centered={true}
                        onCancel={closeModal}
                        closeIcon={<CloseCircleFilled style={{ fontSize: '150%' }} />}
                        width={1200}
                        zIndex={9000}
                        footer={null}>
                        <div className="card-body">
                            <div className="container justify-content-center">
                                <div className="row ">
                                    <div className="col-md-12 pb-md-30">
                                        <div className="html-text" dangerouslySetInnerHTML={{ __html: current_press.content }} />
                                        <div className="row py-md-30">
                                            <div className="col-md-6">keywords:
                                                {current_press.keywords && current_press.keywords.length > 0 && (current_press.keywords.map((keyword, index) => {
                                                    return <Tag color="purple" className="m-2">{keyword.name}</Tag>
                                                }))}
                                            </div>
                                            <div className="col-md-6">Tags:

                                                {current_press.tags && current_press.tags.length > 0 && (current_press.tags.map((tag, index) => {
                                                    return <Tag color="cyan" className="m-2">{tag.name}</Tag>
                                                }))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <Modal
                        className="deleteDiasporaModal"
                        visible={modal_is_open && modal_name === "deleteBlog"}
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
                                            <button className="btn btn-delete" type="button" onClick={() => deleteBlog()}>
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

export default Press;