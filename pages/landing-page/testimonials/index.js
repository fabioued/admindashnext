import InnerMenu from "../../../components/Navigation/InnerMenu";
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../../context/index"
import BreadCrumb from "../../../components/Navigation/Breadcrumb"
import BreadcrumbButton from "../../../components/Navigation/BreadcrumbButton";
import Links from "../../../lib/innerMenu"
import landingPageService from "../../../services/landing-page/landingPageService";
import TestimonyCard from "../../../components/testimonials/TestimonyCard"

const Testimonials = () => {

    const { state, dispatch } = useContext(Context);
    const [modalTitle, setModalTitle] = useState('');
    const {
        loading, testimonials, testimonials_count
    } = state;

    const [buttonLoading, setButtonLoading] = useState(false);

    let type = 1;
    const { current_page } = state;

    let lang = 'en';

    useEffect(() => {
        (async () => {
            dispatch({
                type: "SET_LOADING",
                payload: true
            });
            const data = await landingPageService.fetchAllTestimonials(lang);

            dispatch({
                type: "SET_TESTIMONIALS_COUNT",
                payload: data.testimonials.length
            });
            dispatch({
                type: "SET_TESTIMONIALS",
                payload: data.testimonials
            });

            dispatch({
                type: "SET_CURRENT_PAGE",
                payload: 'landing-page-testimonials'
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
                            <BreadCrumb title={"Manage Testimonials"} count={testimonials_count} />
                            {/* <BreadcrumbButton title={"Add New {Partner}"} link={"/landing-page/testimonials/add-testimony"} /> */}
                        </div>
                    </div>

                </div>
                <div className="row">
                    {testimonials && testimonials.length > 0 && testimonials.map(
                        function (testimonial, index) {
                            return (<TestimonyCard key={index} testimonial={testimonial} />);
                        }

                    )}
                    {testimonials && testimonials.length < 1 && (
                        <tr>
                            <td colSpan="7" className="text-center">
                                No Testimonials
                            </td>
                        </tr>
                    )}
                </div>


            </div>

        </>
    );
};

export default Testimonials;