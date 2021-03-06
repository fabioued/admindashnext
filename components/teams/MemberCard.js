import { useContext, useState } from "react";
import { Context } from "../../context/index"
import Image from "next/image"
import { toast } from "react-toastify"
import { SyncOutlined } from '@ant-design/icons';
import { Edit, Linkedin, Trash2, Mail } from 'react-feather';

const MemberCard = ({ team }) => {
    // const { state, dispatch } = useContext(Context);
    // const [reason, setReason] = useState("");
    // const [id, setId] = useState(0);
    // const { viewing_user, confirmed_diaspora, confirmed_diaspora_count } = state;
    // const [loading, setLoading] = useState(false);
    return (
        <>
            <div className="cos-xl-2 col-lg-4 mb-30 col-sm-6">
                <div className="card position-relative user-member-card">
                    <div className="card-body text-center p-30">
                        <div className="account-profile">
                            <div className="ap-img d-flex justify-content-center">
                                <img className="ap-img__main rounded-circle mb-20 bg-opacity-primary wh-150" src={team.image} alt="profile" />
                            </div>
                            <div className="ap-nameAddress pb-3">
                                <h6 className="ap-nameAddress__title">{team.name} <span className="mx-2 atbd-tag tag-success tag-transparented">{team.lang === 'en' ? 'English' : 'French'}</span></h6>
                                <p className="ap-nameAddress__subTitle fs-13 pt-1 m-0">{team.position}</p>
                            </div>
                            <ul className="db-social-parent mb-0 justify-content-center">
                                <li className="db-social-parent__item"><a className="text-center color-facebook hover-facebook wh-38 fs-16 rounded-circle" href="#"> <Mail /> {team.email}</a></li>
                                <li className="db-social-parent__item  my-5"><a className="color-twitter hover-twitter wh-38 fs-16 rounded-circle" href={team.linkedin} target="_blank"> <Linkedin /> Linkedin</a></li>
                            </ul>
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


