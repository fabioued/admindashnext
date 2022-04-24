import InnerMenu from "../../../components/Navigation/InnerMenu";
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../../context/index"
import BreadCrumb from "../../../components/Navigation/Breadcrumb"
import BreadcrumbButton from "../../../components/Navigation/BreadcrumbButton";
import Links from "../../../lib/innerMenu"
import GroupCard from "../../../components/faqs/GroupCard"

const Faqs = () => {

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
                        <div className="breadcrumb-main user-member justify-content-sm-between ">
                            <BreadCrumb title={"Manage Groups"} count={13} />
                            <BreadcrumbButton title={"Add New Group"} link={"/landing-page/faqs/groups/add-group"} />
                        </div>
                    </div>

                </div>
                <div className="row">
                    <GroupCard title="General" />
                    <GroupCard title="Diaspora" />
                    <GroupCard title="Startups" />
                    <GroupCard title="Data Protection" />
                </div>
            </div>

        </>
    );
};

export default Faqs;