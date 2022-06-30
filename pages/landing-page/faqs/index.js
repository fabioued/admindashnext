import InnerMenu from "../../../components/Navigation/InnerMenu";
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../../context/index"
import BreadCrumb from "../../../components/Navigation/Breadcrumb"
import BreadcrumbButton from "../../../components/Navigation/BreadcrumbButton";
import Links from "../../../lib/innerMenu"
import GroupCard from "../../../components/faqs/GroupCard"
import landingPageService from "../../../services/landing-page/landingPageService";

const Faqs = () => {

    const { state, dispatch } = useContext(Context);
    const [modalTitle, setModalTitle] = useState('');
    const {
        loading, groups, groups_count
    } = state;
    const { current_page } = state;

    useEffect(() => {
        (async () => {
            dispatch({
                type: "SET_LOADING",
                payload: true
            });
            const data = await landingPageService.fetchAllGroups();

            dispatch({
                type: "SET_GROUPS_COUNT",
                payload: data.length
            });
            dispatch({
                type: "SET_GROUPS",
                payload: data
            });

            dispatch({
                type: "SET_CURRENT_PAGE",
                payload: 'landing-page-faq-groups'
            });

            dispatch({
                type: "SET_LOADING",
                payload: false
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
                            <BreadCrumb title={"Manage Groups"} count={groups_count} />
                            {/* <BreadcrumbButton title={"Add New Group"} link={"/landing-page/faqs/groups/add-group"} /> */}
                        </div>
                    </div>

                </div>
                <div className="row">

                    {groups && groups.length > 0 && groups.map(
                        function (group, index) {
                            return (<GroupCard key={index} group={group} title={group.group_name} />);
                        }
                    )}
                </div>
            </div>

        </>
    );
};

export default Faqs;