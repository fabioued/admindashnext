import { useContext, useState } from "react";
import { Context } from "../../context/index"
import Image from "next/image"
import { toast } from "react-toastify"
import { SyncOutlined } from '@ant-design/icons';
import { Modal, Alert, Button, Tag, Space } from 'antd';
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'
import en from 'javascript-time-ago/locale/en.json'

import { Calendar } from 'react-feather';


TimeAgo.addDefaultLocale(en)


const readingTime = (text) => {
    let minutes = 0;
    const contentString = JSON.stringify(text);
    const words = contentString.split(" ").length;
    const wordsPerMinute = 200;
    minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
};




const NewsCard = ({ article }) => {
    const { state, dispatch } = useContext(Context);
    // const [reason, setReason] = useState("");
    // const [id, setId] = useState(0);
    // const { viewing_user, confirmed_diaspora, confirmed_diaspora_count } = state;
    // const [loading, setLoading] = useState(false);


    const showModal = async (article) => {
        dispatch({
            type: "SET_CURRENT_NEWS",
            payload: article
        })
        dispatch({
            type: "SET_MODAL_TITLE",
            payload: 'Viewing News Article:  ' + article?.title
        })
        dispatch({
            type: "SET_MODAL",
            payload: true
        })
        dispatch({
            type: "SET_MODAL_NAME",
            payload: "ViewNews"
        })
    }


    const fortmatCountry = (country) => {
        var countries = require("i18n-iso-countries");
        countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
        countries.registerLocale(require("i18n-iso-countries/langs/fr.json"));
        return (country = countries.getName(country, 'en', {
            select: "official",
        }));
    };


    const showDeleteNewsModal = async (article) => {
        dispatch({
            type: "SET_CURRENT_NEWS",
            payload: article
        })
        dispatch({
            type: "SET_MODAL_TITLE",
            payload: 'Deleting News Article:  ' + article?.title
        })
        dispatch({
            type: "SET_MODAL",
            payload: true
        })
        dispatch({
            type: "SET_MODAL_NAME",
            payload: "DeleteNews"
        })
    }
    return (
        <>
            <div className="cus-xl-3 col-lg-4 col-md-11 col-12 mb-30 px-10">
                <div className="card product product--grid newsCard">
                    <div className="h-100">
                        <div className="product-item">
                            <div className="card-body px-20 pb-25 pt-20">
                                <div className="product-item__body text-capitalize p-2">
                                    <h6 className="card-title text-center">{article.title}</h6>
                                    <div className="d-flex align-items-center mb-10 flex-wrap">
                                        <span className="product-desc-price">{fortmatCountry(article.country)} </span>
                                        <span className="product-discount"> | <ReactTimeAgo date={article.publishedDate} locale="en-US" /> | {readingTime(article.fullText)}  min read</span>
                                    </div>
                                    <p>{article.summary.substring(0, 140) + ' ...'}</p>
                                </div>
                                <div className="button-group">
                                    {<Button block className="feed-approve" onClick={() => showModal(article)}>View</Button>}
                                    {/* {<Button block className="feed-reject" onClick={() => showModal(article)}>Edit</Button>} */}
                                    {<Button block className="feed-delete" onClick={() => showDeleteNewsModal(article)}>Delete</Button>}
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewsCard;


