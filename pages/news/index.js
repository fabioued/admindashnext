import InnerMenu from "../../components/Navigation/InnerMenu";
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../context/index"
import Links from "../../lib/innerMenu"
import LoadMore from "../../components/loadMore/index"
import PageLoader from '../../components/loaders/PageLoader'
import { toast } from "react-toastify"


import EmptyCard from "../../components/empty/Card";
import NewsCard from "../../components/news/NewsCard"
import newsService from "../../services/news/newsService";

import Filter from "../../components/filters/index";
import BreadCrumb from "../../components/Navigation/Breadcrumb"
import BreadcrumbButton from "../../components/Navigation/BreadcrumbButton";
import { Modal, Alert, Button, Tag, Space } from 'antd';

import { SyncOutlined, CloseCircleFilled, WarningFilled } from '@ant-design/icons';


const News = () => {

    const { state, dispatch } = useContext(Context);
    let { current_page, news, news_count, pagination,
        loading, current_news, modal_is_open, modal_name, modal_title
    } = state;


    const [buttonLoading, setButtonLoading] = useState(false);

    let [lang, setLang] = useState('en');
    let message = "Are you sure you want to delete ? You can't undo this action.";
    lang = "en";

    useEffect(() => {
        (async () => {
            dispatch({
                type: "SET_LOADING",
                payload: true
            });

            const data = await newsService.fetchNews({
                pagination, lang
            });
            dispatch({
                type: "SET_NEWS",
                payload: data.news
            });
            dispatch({
                type: "SET_NEWS_COUNT",
                payload: data.news.length
            });

            dispatch({
                type: "SET_CURRENT_PAGE",
                payload: 'all-news'
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


    const deleteNews = async () => {
        try {
            setButtonLoading(true)
            let id = current_news.id;
            await newsService.deleteNews(id);
            let newRecords = news.filter(function (article) {
                return article.id != id
            });
            dispatch({
                type: "SET_NEWS",
                payload: newRecords
            });
            dispatch({
                type: "SET_NEWS_COUNT",
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

            toast.success('The article has been deleted successfully !!!', {
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
        <>
            {/* <InnerMenu links={Links.newsLinks} /> */}
            {loading && (<PageLoader />)}
            {!loading && (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="breadcrumb-main user-member justify-content-sm-between ">
                                {/* <BreadCrumb title={"Manage All News"} count={news_count} /> */}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <Filter filterType='lang' />
                        </div>
                    </div>
                    <div className="row">
                        {news && news.length > 0 && (news.map((news_article, index) => {
                            return <NewsCard key={index} article={news_article
                            } />
                        }))}

                        {
                            news.length <= 0 && (<EmptyCard text="No Records Found" />)
                        }

                    </div>
                </div>)}


            <Modal
                className="viewNewsArticleModal"
                visible={modal_is_open && modal_name === "ViewNews"}
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
                                <div className="html-text" dangerouslySetInnerHTML={{ __html: current_news.fullText }} />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>



            <Modal
                className="deleteDiasporaModal"
                visible={modal_is_open && modal_name === "DeleteNews"}
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
                                    <button className="btn btn-delete" type="button" onClick={() => deleteNews()}>
                                        {buttonLoading ? (<span><SyncOutlined spin ></SyncOutlined> Deleting ...</span>) : 'Delete'}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </Modal>


        </>
    );
};

export default News;