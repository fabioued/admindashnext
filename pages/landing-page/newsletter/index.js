import InnerMenu from "../../../components/Navigation/InnerMenu";
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../../context/index"
import BreadCrumb from "../../../components/Navigation/Breadcrumb"
import BreadcrumbButton from "../../../components/Navigation/BreadcrumbButton";
import Links from "../../../lib/innerMenu"
import landingPageService from "../../../services/landing-page/landingPageService";
import { toast } from "react-toastify"
import moment from 'moment';

const Newsletter = () => {

    const { state, dispatch } = useContext(Context);
    const [modalTitle, setModalTitle] = useState('');
    const {
        loading, newsletter, newsletter_count
    } = state;
    const { current_page } = state;

    const formatDate = (date) => {
        moment.locale('en');
        return moment(date).format("LL");
    }

    const fechtAll = async () => {

        const data = await landingPageService.fetchAllNewsletters();

        dispatch({
            type: "SET_NEWSLETTER_COUNT",
            payload: data.count
        });
        dispatch({
            type: "SET_NEWSLETTER",
            payload: data.signups
        });

        dispatch({
            type: "SET_CURRENT_PAGE",
            payload: 'landing-page-newsletter'
        });

    }

    useEffect(() => {
        (async () => {
            dispatch({
                type: "SET_LOADING",
                payload: true
            });
            fechtAll();

            dispatch({
                type: "SET_LOADING",
                payload: false
            });
        })();
    }, []);

    const deleteRecord = async (email) => {

        try {
            dispatch({
                type: "SET_LOADING",
                payload: true
            });
            await landingPageService.deleteNewsletterRecord(email);
            fechtAll();

            dispatch({
                type: "SET_LOADING",
                payload: false
            });

        } catch (err) {
            dispatch({
                type: "SET_LOADING",
                payload: false
            });
            let message = err.message;
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT,
            })

        }


    }

    return (
        <>
            <InnerMenu links={Links.landinLinks} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb-main user-member justify-content-sm-between ">
                            <BreadCrumb title={"Newsletters"} count={newsletter_count} />
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="userDatatable global-shadow border p-30 bg-white radius-xl w-100 mb-30">
                            <div className="table-responsive">
                                <table className="table mb-0 table-borderless">
                                    <thead>
                                        <tr className="userDatatable-header">

                                            <th>
                                                <span className="userDatatable-title">Name</span>
                                            </th>
                                            <th>
                                                <span className="userDatatable-title">Email</span>
                                            </th>
                                            <th>
                                                <span className="userDatatable-title">Category</span>
                                            </th>
                                            <th>
                                                <span className="userDatatable-title">Date</span>
                                            </th>
                                            <th>
                                                <span className="userDatatable-title float-right">action</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {newsletter && newsletter_count > 0 && newsletter.map(
                                            function (signup, index) {
                                                return (

                                                    <tr key={index}>
                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {signup.name}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {signup.email}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {signup.category === 'diaspora' ? <span className="bg-opacity-success  color-success rounded-pill userDatatable-content-status active"> {signup.category}</span> : <span className="bg-opacity-warning color-warning rounded-pill userDatatable-content-status active"> {signup.category}</span>}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="userDatatable-content d-inline-block">
                                                                {formatDate(signup?.created_at)}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                <li>
                                                                    <a href="#" className="remove" onClick={() => deleteRecord(signup.email)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1={10} y1={11} x2={10} y2={17} /><line x1={14} y1={11} x2={14} y2={17} /></svg></a>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                    </tr>


                                                );
                                            }
                                        )}
                                        {newsletter && newsletter_count < 1 && (
                                            <tr>
                                                <td colSpan="7" className="text-center">
                                                    No Signups
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

        </>
    );
};

export default Newsletter;