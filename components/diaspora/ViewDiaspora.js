import React, { useContext, useEffect, useState } from 'react';
import Link from "next/link"
import { Context } from "../../context/index"
import { getName as getCountryName } from "country-list";
import Moment from "react-moment";

const ViewDiasPora = () => {
    const { state, dispatch } = useContext(Context);
    const diaspora = state.viewing_user;

    // if (loading) {
    //     return <></>;
    // }

    return (
        <>
            <div className="container">
                <div className="row mb-3">
                    <div className="col-md-6 about_overview">
                        <div className="card diaspora-view-card">
                            <div className="card-header">
                                About
                            </div>
                            <div className="card-body about-content">
                                <p className="card-text">{diaspora.about}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 about_overview">
                        <div className="card diaspora-view-card">
                            <div className="card-header">
                                Overview
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 list-side">
                                        <p>Lives In</p>
                                        <p>Origin</p>
                                        <p>Education Level</p>
                                        <p>Years of experience</p>
                                        <p>Avatar</p>
                                    </div>
                                    <div className="col-md-6 list-side">
                                        <p>{diaspora.overview.LivesIn ? getCountryName(diaspora.overview.LivesIn) : '-'}</p>
                                        <p>{diaspora.overview.Origin ? getCountryName(diaspora.overview.Origin) : '-'}</p>
                                        <p>{diaspora.overview.EducationLevel ? diaspora.overview.EducationLevel : '-'}</p>
                                        <p>{diaspora.overview.YearsOfExperience ? diaspora.overview.YearsOfExperience : '-'}</p>
                                        <p><Link href={diaspora.overview.Avatar} passHref>
                                            <a target="_blank" className="text-success">View Avatar</a>
                                        </Link></p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                <div className="row mb-3">
                    <div className="col-md-12 mb-3">
                        <div className="card diaspora-view-card looking_expertise">
                            <div className="card-header">
                                Looking To
                            </div>
                            <div className="card-body">
                                <ul>
                                    {diaspora.LookingFor && diaspora.LookingFor.length > 0 && diaspora.LookingFor.map(function (talent, index) {
                                        return (<span className="atbd-tag tag-light " key={index}>{talent.typeOfSupport}</span>)
                                    })}

                                    {diaspora.LookingFor && diaspora.LookingFor.length < 1 && (<li className="text-center">No Data</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 ">
                        <div className="card diaspora-view-card looking_expertise">
                            <div className="card-header">
                                Areas of expertise
                            </div>
                            <div className="card-body">
                                <ul>
                                    {diaspora.AreasOfExpertise && diaspora.AreasOfExpertise.length > 0 && diaspora.AreasOfExpertise.map(function (expertise, index) {
                                        return (<span className="atbd-tag tag-light " key={index}>{expertise.talent_name}</span>)
                                    })}

                                    {diaspora.AreasOfExpertise && diaspora.AreasOfExpertise.length < 1 && (<li className="text-center">No Data</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 ">
                        <div className="card diaspora-view-card looking_expertise">
                            <div className="card-header">
                                Interested in startups within
                            </div>
                            <div className="card-body">
                                <ul>
                                    {diaspora.within && diaspora.within.length > 0 && diaspora.within.map(function (interest, index) {
                                        return (<span className="atbd-tag tag-light " key={index}>{interest.name}</span>)
                                    })}

                                    {diaspora.within && diaspora.within.length < 1 && (<li className="text-center">No Data</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <div className="p-3 diaspora-table-in-modal-header">Work Experience</div>
                            <table className="table table-light table-striped  table-hover diaspora-table-in-modal">
                                <thead >
                                    <tr>
                                        <th>Title</th>
                                        <th>Compagny</th>
                                        <th>Location  </th>
                                        <th>From - To</th>
                                        <th>Type</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {diaspora.workExperience.length > 0 ? (
                                        diaspora.workExperience.map((experience, index) => (
                                            <tr key={index}>
                                                <td>{experience.title ? experience.title : '-'}</td>
                                                <td>{experience.company ? experience.company : '-'}</td>
                                                <td>{experience.country ? getCountryName(experience.country) : '='}</td>
                                                <td>
                                                    <Moment format="DD/MM/YYYY">
                                                        {experience.startDate}
                                                    </Moment> - {experience.endDate === 'now' ? 'Now' : <Moment format="DD/MM/YYYY">
                                                        {experience.endDate}
                                                    </Moment>}</td>
                                                <td>{experience.type ? experience.type : '-'}</td>
                                                <td>{experience.description ? experience.description : '-'}</td>
                                            </tr>))
                                    ) : (

                                        <tr>
                                            <td colSpan="6" className="text-center">
                                                There is no work experience for this diaspora
                                            </td>
                                        </tr>

                                    )}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <div className="p-3 diaspora-table-in-modal-header">Education</div>
                            <table className="table table-light table-striped  table-hover diaspora-table-in-modal">
                                <thead >
                                    <tr>
                                        <th>University</th>
                                        <th>Field</th>
                                        <th>Location  </th>
                                        <th>From - To</th>
                                        <th>Degree</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {diaspora.educations.length > 0 ? (
                                        diaspora.educations.map((education, index) => (
                                            <tr key={index}>
                                                <td>{education.university ? education.university : '-'}</td>
                                                <td>{education.title ? education.title : '-'}</td>
                                                <td>{education.country ? getCountryName(education.country) : '='}</td>
                                                <td>
                                                    <Moment format="DD/MM/YYYY">
                                                        {education.startDate}
                                                    </Moment> - {education.endDate === 'now' ? 'Now' : <Moment format="DD/MM/YYYY">
                                                        {education.endDate}
                                                    </Moment>}</td>
                                                <td>{education.level ? education.level : '-'}</td>
                                                <td>{education.description ? education.description : '-'}</td>
                                            </tr>))
                                    ) : (

                                        <tr>
                                            <td colSpan="6" className="text-center">
                                                There is no Education cursus for this diaspora
                                            </td>
                                        </tr>

                                    )}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewDiasPora;
