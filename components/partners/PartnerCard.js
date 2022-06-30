import { useContext, useState } from "react";
import { Context } from "../../context/index"
import Image from "next/image"
import { toast } from "react-toastify"
import { SyncOutlined } from '@ant-design/icons';
import { Edit, Linkedin, Trash2, Mail } from 'react-feather';

const PartnerCard = ({ partner }) => {

    return (
        <>
            <div className="col-xxl-3 col-lg-4 col-md-6 mb-25 partner-card">
                <div className="feature-cards">
                    <figure className="feather-cards__figure ">
                        <img className="partner-img" src={partner.src} alt={partner.title} />
                        <figcaption>
                            <h4 className="text-center">{partner.title}</h4>
                            <div className="button-group d-flex justify-content-center flex-wrap pt-20">
                                {/* <button className="btn btn-md btn-info text-white bg-info ">Edit</button>
                                <button className="btn btn-md btn-danger text-white bg-danger btn-default">Delete</button> */}
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </>
    );
};

export default PartnerCard;


