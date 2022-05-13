import { useContext, useState } from "react";
import { Context } from "../../context/index"
import Image from "next/image"
import { toast } from "react-toastify"
import { SyncOutlined } from '@ant-design/icons';
import { Edit, Linkedin, Trash2, Mail } from 'react-feather';

const MemberCard = ({ user }) => {
    let right = user?.rights;
    let level;
    if (right === 'viewer') level = 'info';
    if (right === 'admin') level = 'success';
    if (right === 'superadmin') level = 'danger';
    return (
        <>
            <div className="cos-xl-2 col-lg-4 mb-30 col-sm-6">
                <div className="card position-relative user-member-card">
                    <div className="card-body text-center p-30">
                        <div className="account-profile">
                            <div className="ap-img d-flex justify-content-center">
                                <img width="50" className="ap-img__main rounded-circle mb-20 bg-opacity-primary wh-150"
                                    src="https://res.cloudinary.com/bantaba/image/upload/v1651378168/Platform%20Assets/default_oz1xke.jpg" alt="profile" />
                            </div>
                            <div className="ap-nameAddress pb-3">
                                <h6 className="ap-nameAddress__title">{user?.name} </h6>
                                <p className="ap-nameAddress__subTitle fs-13 pt-1 m-0">{user?.email}</p>
                                <p className="ap-nameAddress__subTitle fs-13 pt-1 m-0">
                                    <span class={`atbd-tag tag-${level} tag-transparented text-capitalize`}>{user?.rights}</span>
                                </p>
                            </div>
                            {/* <div className="ap-button account-profile-cards__button button-group d-flex justify-content-center flex-wrap pt-20">
                                <button type="button" className="feed-reject text-capitalize px-25 shadow2 radius-md">
                                    Edit
                                </button>
                                <button type="button" className="feed-delete text-capitalize px-25 shadow2 radius-md">
                                    Delete
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MemberCard;


