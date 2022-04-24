import { useContext, useState } from "react";
import { Context } from "../../context/index"
import Image from "next/image"
import { toast } from "react-toastify"
import { SyncOutlined } from '@ant-design/icons';
import { Edit, Linkedin, Trash2, Mail } from 'react-feather';

const PartnerCard = ({ name }) => {
    // const { state, dispatch } = useContext(Context);
    // const [reason, setReason] = useState("");
    // const [id, setId] = useState(0);
    // const { viewing_user, confirmed_diaspora, confirmed_diaspora_count } = state;
    // const [loading, setLoading] = useState(false);
    return (
        <>
            <div className="col-xxl-3 col-lg-4 col-md-6 mb-25">
                <div className="feature-cards">
                    <figure className="feather-cards__figure">
                        <img src="https://res.cloudinary.com/bantaba/image/upload/v1648564364/Platform%20Assets/Partners%20logos/miro-2_abac6q.svg" alt="Partner Logo" />
                        <figcaption>
                            <h4 className="text-center">{name}</h4>
                            <div className="button-group d-flex justify-content-center flex-wrap pt-20">
                                <button className="btn btn-md btn-info text-white bg-info ">Edit</button>
                                <button className="btn btn-md btn-danger text-white bg-danger btn-default">Delete</button>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </>
    );
};

export default PartnerCard;


