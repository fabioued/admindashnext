import InnerMenu from "../../components/Navigation/InnerMenu";
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../context/index"
import Links from "../../lib/innerMenu"

const Startups = () => {

    const { state, dispatch } = useContext(Context);
    const { current_page } = state;

    useEffect(() => {
        (async () => {
            dispatch({
                type: "SET_CURRENT_PAGE",
                payload: 'startups-page'
            });
        })();
    }, []);

    return (
        <>
            <InnerMenu links={Links.StartupsLinks} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb-main user-member justify-content-sm-between ">
                            <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                <div className="d-flex align-items-center user-member__title justify-content-center mr-sm-25">
                                    <h4 className="text-capitalize fw-500 breadcrumb-title pl-3">Landing Page</h4>
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

export default Startups;