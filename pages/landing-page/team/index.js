import InnerMenu from "../../../components/Navigation/InnerMenu";
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../../context/index";
import Links from "../../../lib/innerMenu"
import Member from "../../../components/teams/MemberCard"
import BreadCrumb from "../../../components/Navigation/Breadcrumb"
import BreadcrumbButton from "../../../components/Navigation/BreadcrumbButton";
import landingPageService from "../../../services/landing-page/landingPageService";


const Team = () => {

    const { state, dispatch } = useContext(Context);
    const [modalTitle, setModalTitle] = useState('');
    const {
        loading, members, members_count
    } = state;
    const { current_page } = state;

    useEffect(() => {
        (async () => {
            dispatch({
                type: "SET_LOADING",
                payload: true
            });
            const data = await landingPageService.fetchAllMembers();

            dispatch({
                type: "SET_MEMBERS_COUNT",
                payload: data.length
            });
            dispatch({
                type: "SET_MEMBERS",
                payload: data
            });

            dispatch({
                type: "SET_CURRENT_PAGE",
                payload: 'landing-page-team'
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
                    <div class="col-lg-12">
                        <div class="breadcrumb-main user-member justify-content-sm-between ">
                            <BreadCrumb title={"Manage Team Members"} count={members_count} />
                            {/* <BreadcrumbButton title={"Add New Member"} link={"/landing-page/team/add-member"} /> */}
                        </div>
                    </div>
                </div>
                <div className="row">
                    {members && members.length > 0 && members.map(
                        function (member, index) {
                            return (<Member key={index} team={member} />);
                        }
                    )}
                </div>
            </div>

        </>
    );
};

export default Team;