import InnerMenu from "../../components/Navigation/InnerMenu";
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../context/index"


const Jobs = () => {

    const { state, dispatch } = useContext(Context);
    const { current_page } = state;

    const links = [
        {
            name: 'Team Members',
            link: "#"
        }, {
            name: 'Our Partners ',
            link: "#"
        },
        {
            name: 'Testimonials',
            link: "#"
        }, {
            name: 'Faqs',
            link: "#"
        },
        {
            name: 'Non Diaspora List',
            link: "#"
        }, {
            name: 'Referral List ',
            link: "#"
        }, {
            name: 'Link 2',
            link: "#"
        }, {
            name: 'Link 3 ',
            link: "#"
        }];

    useEffect(() => {
        (async () => {
            dispatch({
                type: "SET_CURRENT_PAGE",
                payload: 'landing-page'
            });
        })();
    }, []);

    return (
        <>
            <InnerMenu links={links} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb-main user-member justify-content-sm-between ">
                            <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                <div className="d-flex align-items-center user-member__title justify-content-center mr-sm-25">
                                    <h4 className="text-capitalize fw-500 breadcrumb-title pl-3">All Jobs</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-12">
                </div>
            </div>

        </>
    );
};

export default Jobs;