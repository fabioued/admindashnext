import React, { useContext, useEffect, useState } from 'react';
import Link from "next/link"
import { Context } from "../../context/index"
import { getName as getCountryName } from "country-list";
import Moment from "react-moment";
import { Avatar, Tag, Modal } from 'antd'

const ViewStartup = () => {
    const { state, dispatch } = useContext(Context);
    const startup = state.viewing_startup;


    return (
        <>
            <div className="container">
                <div className="row mb-3">
                    <div className="col-md-12 mb-3">
                        <div className="card diaspora-view-card about_overview_startup">
                            <div className="card-header">
                                About
                            </div>
                            <div className="card-body about-content">
                                <p className="card-text">{startup.about}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 about_overview_startup">
                        <div className="card diaspora-view-card">
                            <div className="card-header">
                                Overview 1/2
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 list-side">
                                        <p>Industry</p>
                                        <p>Employees</p>
                                        <p>Headquarter</p>
                                        <p>Founded in</p>
                                        <p>Website</p>
                                        <p>Logo</p>
                                        <p>Video</p>
                                    </div>
                                    <div className="col-md-6 list-side">
                                        <p>{startup.overview ? startup.overview.Industry : '-'}</p>
                                        <p>{startup.overview ? startup.overview.Employees : '-'}</p>
                                        <p>{startup.overview ? getCountryName(startup.overview.Headquarter) : '-'}</p>
                                        <p><Moment format="DD/MM/YYYY">
                                            {startup.FoundedIn}
                                        </Moment></p>
                                        <p>{startup.overview.Website ? (<Link href={startup.overview.Website} passHref>
                                            <a target="_blank" className="text-success">View Website</a>
                                        </Link>) : '-'}</p>
                                        <p>{startup.overview.Logo ? (<Link href={startup.overview.Logo} passHref>
                                            <a target="_blank" className="text-success">View Logo</a>
                                        </Link>) : '-'}</p>
                                        <p>{startup.overview.Video ? (<Link href={startup.overview.Video} passHref>
                                            <a target="_blank" className="text-success">View Video</a>
                                        </Link>) : '-'}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 about_overview_startup">
                        <div className="card diaspora-view-card">
                            <div className="card-header">
                                Overview 2/2
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 list-side">
                                        <p>Stage</p>
                                        <p>Seeking funding</p>
                                        <p>Revenue</p>
                                        <p>Business Model</p>
                                        <p>Followers</p>
                                        <p>Score</p>
                                    </div>
                                    <div className="col-md-6 list-side">
                                        <p>{startup.overview.Stage ? startup.overview.Stage : '-'}</p>
                                        <p>{startup.overview.SeekingFunding ? startup.overview.SeekingFunding : '-'}</p>
                                        <p>{startup.overview.revenue_state ? startup.overview.revenue_state : '-'}</p>
                                        <p>{startup.overview.business_model ? startup.overview.business_model : '-'}</p>
                                        <p>{startup.overview.Followers ? startup.overview.Followers : '-'}</p>
                                        <p>{startup.overview.Score >= 0 ? startup.overview.Score : '-'}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 my-3">
                        <div className="card diaspora-view-card">
                            <div className="card-header">
                                Traction
                            </div>
                            <div className="card-body about-content">
                                <p className="card-text"> {
                                    startup.about && (<p className="card-text">{startup.traction}</p>)
                                }

                                    {
                                        !startup.lenght && (<p className="card-text">No Traction</p>)
                                    }</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row mb-3">
                    <div className="col-md-6">
                        <div className="card diaspora-view-card looking_expertise">
                            <div className="card-header">
                                Looking For
                            </div>
                            <div className="card-body">
                                <ul>
                                    {startup.LookingFor && startup.LookingFor.length > 0 && startup.LookingFor.map(function (talent, index) {
                                        return (<span className="atbd-tag tag-light " key={index}>{talent.typeOfSupport}</span>)
                                    })}

                                    {startup.LookingFor && startup.LookingFor.length < 1 && (<li className="text-center">No Data</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 ">
                        <div className="card diaspora-view-card looking_expertise">
                            <div className="card-header">
                                Within...
                            </div>
                            <div className="card-body">
                                <ul>
                                    {startup.Within && startup.Within.length > 0 && startup.Within.map(function (expertise, index) {
                                        return (<span className="atbd-tag tag-light " key={index}>{expertise.name}</span>)
                                    })}

                                    {startup.Within && startup.Within.length < 1 && (<li className="text-center">No Data</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-12 ">
                        <div className="contact-list-wrap mb-25">
                            <div className="contact-list bg-white radius-xl w-100">
                                <div className="table-responsive">
                                    <table className="table tableClass mb-0 table-borderless table-rounded table table-striped">

                                        <tbody>
                                            {startup && startup.team.length >= 1 && startup.team.map(function (team, index) {
                                                return (<tr key={index}>
                                                    <td>
                                                        <div className="contact-item d-flex align-items-center">
                                                            <div className="contact-personal-info d-flex">
                                                                <Avatar size={35} className="profile-image rounded-circle d-block m-0 wh-38" src={team.image ? team.image : ''} />
                                                                <div className="contact_title">
                                                                    <h6>
                                                                        {team?.name}
                                                                    </h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{team.position ? team.position : '-'}</td>
                                                    <td>
                                                        <div className="team_desc">
                                                            {team.description ? team.description : '-'}
                                                        </div>
                                                    </td>

                                                </tr>)

                                            })}

                                            {startup && startup.team.length < 1 && (
                                                <tr>
                                                    <td colSpan="7" className="text-center">
                                                        No confirmed diaspora
                                                    </td>
                                                </tr>
                                            )}

                                        </tbody>

                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ViewStartup;
