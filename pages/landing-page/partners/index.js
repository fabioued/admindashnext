import InnerMenu from "../../../components/Navigation/InnerMenu";
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../../context/index"
import BreadCrumb from "../../../components/Navigation/Breadcrumb"
import BreadcrumbButton from "../../../components/Navigation/BreadcrumbButton";
import Links from "../../../lib/innerMenu"
import landingPageService from "../../../services/landing-page/landingPageService";
import Partner from "../../../components/partners/PartnerCard"

const Partners = () => {
    const { state, dispatch } = useContext(Context);
    const [modalTitle, setModalTitle] = useState('');
    const {
        loading, partners, partners_count
    } = state;
    const { current_page } = state;

    useEffect(() => {
        (async () => {
            dispatch({
                type: "SET_LOADING",
                payload: true
            });
            const data = await landingPageService.fetchAllPartners();

            dispatch({
                type: "SET_PARTNERS_COUNT",
                payload: data.partners.length
            });
            dispatch({
                type: "SET_PARTNERS",
                payload: data.partners
            });

            dispatch({
                type: "SET_CURRENT_PAGE",
                payload: 'landing-page-partners'
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
                        <div class="breadcrumb-main user-member justify-content-sm-between ">
                            <BreadCrumb title={"Manage Partners"} count={partners_count} />
                            {/* <BreadcrumbButton title={"Add New {Partner}"} link={"/landing-page/partners/add-partner"} /> */}
                        </div>
                    </div>

                </div>
                <div className="col-12">
                    <div className="row">

                        {partners && partners.length > 0 && partners.map(
                            function (partner, index) {
                                return (<Partner key={index} partner={partner} />);
                            }
                        )}

                        {partners && partners.length < 1 && (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No Partners
                                </td>
                            </tr>
                        )}

                    </div>
                </div>
            </div>

        </>
    );
};

export default Partners;