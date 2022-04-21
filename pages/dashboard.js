import { Context } from '../context'
import { useRouter } from "next/router"
import React, { useContext } from 'react';
import ProtectedRoute from "../components/routes/protectedRoute"
import { Banner1, Banner2 } from "../components/banners/Banners";
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