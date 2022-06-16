import { useContext, useState } from "react";
import { Context } from "../../context/index"
import Image from "next/image"
import { toast } from "react-toastify"
import { SyncOutlined } from '@ant-design/icons';
import { Modal, Alert, Button, Tag, Space } from 'antd';
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'
import en from 'javascript-time-ago/locale/en.json'

import moment from 'moment';
import { MapPin } from 'react-feather';


TimeAgo.addDefaultLocale(en)


const readingTime = (text) => {
    let minutes = 0;
    const contentString = JSON.stringify(text);
    const words = contentString.split(" ").length;
    const wordsPerMinute = 200;
    minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
};




const JobCard = ({ job }) => {
    const { state, dispatch } = useContext(Context);
    // const [reason, setReason] = useState("");
    // const [id, setId] = useState(0);
    const { lang } = state;
    // const [loading, setLoading] = useState(false);


    const formatDate = (date) => {
        moment.locale(lang);
        return moment(date).format("LL");
    }

    const fortmatCountry = (country) => {
        var countries = require("i18n-iso-countries");
        countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
        countries.registerLocale(require("i18n-iso-countries/langs/fr.json"));
        return (country = countries.getName(country, 'en', {
            select: "official",
        }));
    };

    const showModal = async (job) => {
        dispatch({
            type: "SET_CURRENT_JOB",
            payload: job
        })
        dispatch({
            type: "SET_MODAL_TITLE",
            payload: 'Viewing Job Article:  ' + job?.title
        })
        dispatch({
            type: "SET_MODAL",
            payload: true
        })
        dispatch({
            type: "SET_MODAL_NAME",
            payload: "ViewJob"
        })
    }


    const showDeleteNewsModal = async (job) => {
        dispatch({
            type: "SET_CURRENT_JOB",
            payload: job
        })
        dispatch({
            type: "SET_MODAL_TITLE",
            payload: 'Deleting JOb Article:  ' + job?.title
        })
        dispatch({
            type: "SET_MODAL",
            payload: true
        })
        dispatch({
            type: "SET_MODAL_NAME",
            payload: "DeleteJob"
        })
    }
    return (
        <>
            <div className="cus-xl-3 col-lg-4 col-md-11 col-12 mb-30 px-10">
                <div className="card product product--grid newsCard">
                    <div className="h-100">
                        <div className="product-item p-2">
                            <div className="card-body px-20 pb-25 pt-20">
                                <div className="Job-deadline"><Tag color="red" className="my-2">{formatDate(job?.deadline)}</Tag></div>
                                <div className="row">
                                    <div className=" Job-logo">
                                        <img className="ap-img__main  bg-opacity-primary  wh-120 rounded-circle mb-3 " src={job?.companyLogo} alt="profile" />
                                    </div>
                                </div>
                                <div className="product-item__body text-capitalize">
                                    <h6 className="card-title text-center">{job.title}</h6>
                                    <div className="d-flex align-items-center mb-10 flex-wrap">
                                        <span className="product-desc-price"> </span>
                                        <span className="product-discount"></span>
                                    </div>

                                    <Tag color="#E0E0E0" className="offset-md-5 text-center center px-3 my-3">
                                        <span className="text-black ">{fortmatCountry(job?.country)}</span>
                                    </Tag>
                                    <p>{job.summary.substring(0, 140) + ' ...'}</p>
                                </div>
                                <div className="button-group">
                                    {<Button block className="feed-approve" onClick={() => showModal(job)}>View</Button>}
                                    {/* {<Button block className="feed-reject" onClick={() => showModal(job)}>Edit</Button>} */}
                                    {<Button block className="feed-delete" onClick={() => showDeleteNewsModal(job)}>Delete</Button>}
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobCard;


