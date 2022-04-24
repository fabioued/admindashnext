import InnerMenu from "../../../components/Navigation/InnerMenu";
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../../context/index";
import Links from "../../../lib/innerMenu"
import Member from "../../../components/teams/MemberCard"
import BreadCrumb from "../../../components/Navigation/Breadcrumb"
import BreadcrumbButton from "../../../components/Navigation/BreadcrumbButton";

const Team = () => {

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
                    <div class="col-lg-12">
                        <div class="breadcrumb-main user-member justify-content-sm-between ">
                            <BreadCrumb title={"Manage Team Members"} count={13} />
                            <BreadcrumbButton title={"Add New Member"} link={"/landing-page/team/add-member"} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <Member />
                    <Member />
                    <Member />

                </div>
            </div>

        </>
    );
};

export default Team;