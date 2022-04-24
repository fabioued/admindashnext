import InnerMenu from "../../../components/Navigation/InnerMenu";
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../../context/index"
import BreadCrumb from "../../../components/Navigation/Breadcrumb"
import BreadcrumbButton from "../../../components/Navigation/BreadcrumbButton";
import Links from "../../../lib/innerMenu"

import Partner from "../../../components/partners/PartnerCard"

const Partners = () => {

    const { state, dispatch } = useContext(Context);
    const { current_page } = state;


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
            <InnerMenu links={Links.landinLinks} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div class="breadcrumb-main user-member justify-content-sm-between ">
                            <BreadCrumb title={"Manage Partners"} count={13} />
                            <BreadcrumbButton title={"Add New {Partner}"} link={"/landing-page/partners/add-partner"} />
                        </div>
                    </div>

                </div>
                <div className="col-12">
                    <div className="row">
                        <Partner name="Amazon Web Services" />
                        <Partner name="Sendgrid" />
                        <Partner name="Miro" />

                    </div>
                </div>
            </div>

        </>
    );
};

export default Partners;