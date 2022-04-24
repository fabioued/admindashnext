import { Context } from '../context'
import { useRouter } from "next/router"
import React, { useContext } from 'react';
import ProtectedRoute from "../components/routes/protectedRoute"
import { Banner1, Banner2 } from "../components/banners/Banners";
import Statictic from "../components/dashboard/Statistic"

const Dashboard = () => {
    const { state, dispatch } = useContext(Context);
    const { user } = state;

    return (
        <ProtectedRoute>
            <div className="container-fluid">
                <div className="social-dash-wrap">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-main">
                                <h4 className="text-capitalize text-center breadcrumb-title">Welcome to Bantaba Dashboard
                                    {/* <span className="text-primary"> {
                                        user['name']
                                    }</span> */}
                                </h4>
                            </div>
                        </div>
                        <div className="row">
                            <Statictic title="Total Diaspora" count="230" type="primary" image="img/svg/feature-cards9.svg" />
                            <Statictic title="Total Startups" count="200" type="warning" image="img/svg/feature-cards9.svg" />
                            <Statictic title="Get Verified Badges" count="23" type="danger" image="img/svg/feature-cards10.svg" />
                            <Statictic title="Newsletter Subscriptions" count="23" type="primary" image="img/svg/feature-cards9.svg" />
                            <Statictic title="Non Diaspora Users" count="23" type="primary" image="img/svg/feature-cards9.svg" />
                            <Statictic title="Contact Messages" count="23" type="primary" image="img/svg/feature-cards9.svg" />
                            <Statictic title="Total Partners" count="3" type="success" image="img/svg/feature-cards9.svg" />
                            <Statictic title="Total Exclusive Offers" count="23" type="primary" image="img/svg/feature-cards9.svg" />
                            <Statictic title="Total Exclusive Offers Clicks" count="23" type="primary" image="img/svg/feature-cards9.svg" />
                            <Statictic title="Referrals" count="23" type="primary" image="img/svg/feature-cards9.svg" />
                            <Statictic title="Total Blogs" count="23" type="danger" image="img/svg/feature-cards10.svg" />
                            <Statictic title="Total Press" count="23" type="danger" image="img/svg/feature-cards10.svg" />
                            <Statictic title="News" count="23" type="danger" image="img/svg/feature-cards10.svg" />
                            <Statictic title="Careers" count="23" type="danger" image="img/svg/feature-cards10.svg" />
                            <Statictic title="Feeds" count="23" type="danger" image="img/svg/feature-cards10.svg" />
                        </div>
                        <div className="row">
                            <div className="card col-xxl-4 col-lg-6 col-sm-12 m-bottom-30">
                                <div className="card-header">
                                    <h6>Sessions by Device</h6>
                                </div>
                                <div className="card-body">

                                    <div className="revenue-chart-box-list">
                                        <div className="revenue-chart-box d-flex flex-wrap align-items-center">
                                            <div className="revenue-chart-box__Icon order-bg-opacity-success">
                                                <img className="svg" src="img/svg/sent.svg" alt="" />
                                            </div>
                                            <div className="my-10">
                                                <div className="revenue-chart-box__data">
                                                    4450
                                                </div>
                                                <div className="revenue-chart-box__label">
                                                    Total Sent
                                                </div>
                                            </div>
                                        </div>
                                        <div className="revenue-chart-box d-flex flex-wrap align-items-center">
                                            <div className="revenue-chart-box__Icon order-bg-opacity-primary">
                                                <img className="svg" src="img/svg/opened.svg" alt="" />
                                            </div>
                                            <div className="my-10">
                                                <div className="revenue-chart-box__data">
                                                    5864
                                                </div>
                                                <div className="revenue-chart-box__label">
                                                    Open
                                                </div>
                                            </div>
                                        </div>
                                        <div className="revenue-chart-box d-flex flex-wrap align-items-center">
                                            <div className="revenue-chart-box__Icon order-bg-opacity-warning">
                                                <img className="svg" src="img/svg/not-open.svg" alt="" />
                                            </div>
                                            <div className="my-10">
                                                <div className="revenue-chart-box__data">
                                                    2450
                                                </div>
                                                <div className="revenue-chart-box__label">
                                                    Not Open
                                                </div>
                                            </div>
                                        </div>
                                        {/* ends: .revenue-chart-legend */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Banner2 title="Landing Page" message="View, Approve or Reject startups " link="/landing-page" image="img/svg/group9102.svg" />
                        <Banner2 title="Manage Diaspora" message="View, Approve or Reject diaspora users" link="/diaspora/confirmed-diaspora" image="img/svg/feature4.svg" />
                        <Banner2 title="Manage Startups" message="View, Approve or Reject startups " link="/startups" image="img/svg/group9102.svg" />
                        <Banner2 title="Manage User Feeds" message="View, create and edit Feeds" link="/diaspora" image="img/svg/group9102.svg" />
                        <Banner2 title="Manage Blog" message="View, create and edit Blogs and Press" link="/blogs" image="img/svg/group9102.svg" />
                        <Banner2 title="Manage News" message="View, create and edit News" link="/news" image="img/svg/group9102.svg" linkText="View" />
                        <Banner2 title="Manage Jobs" message="View, create and edit Jobs" link="/jobs" image="img/svg/group9102.svg" linkText="View" />
                        <Banner2 title="Manage Users" message="" link="/users" image="img/svg/group9102.svg" linkText="View" />
                        <Banner2 title="Manage Subscribers" message="List of all users that subscribed to the newsletter" link="/users" image="img/svg/group9102.svg" linkText="View" />
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default Dashboard;