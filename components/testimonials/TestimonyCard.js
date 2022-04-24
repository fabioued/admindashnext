import { useContext, useState } from "react";
import { Context } from "../../context/index"
import Image from "next/image"
import { toast } from "react-toastify"
import { SyncOutlined } from '@ant-design/icons';
import { Edit, Linkedin, Trash2, Mail } from 'react-feather';

const TestimonyCard = ({ name }) => {
    // const { state, dispatch } = useContext(Context);
    // const [reason, setReason] = useState("");
    // const [id, setId] = useState(0);
    // const { viewing_user, confirmed_diaspora, confirmed_diaspora_count } = state;
    // const [loading, setLoading] = useState(false);
    return (
        <>
            <div className="col-md-6 mb-4">
                <div className="testimonial-slider2 testimonial-slider-global">
                    <div className="card">
                        <div className="card-body">
                            <div className="author-thumb mb-sm-6 mb-xs-3 d-flex justify-content-between">
                                <div className="d-flex flex-wrap">
                                    <div className="mr-20">
                                        <img className="wh-70 rounded-circle" src="https://ourbantaba.com/_next/image/?url=https%3A%2F%2Fres.cloudinary.com%2Fbantaba%2Fimage%2Fupload%2Fv1648913957%2FPlatform%2520Assets%2Ftestimonials%2FImage_from_iOS_1_modwjp.jpg&w=3840&q=75" alt="" />
                                    </div>
                                    <div>
                                        <p className="mb-0">Duran Clayton</p>
                                        <span>UI/UX Designer</span>
                                        <span class="mx-2 atbd-tag tag-success tag-transparented">English</span>
                                    </div>
                                </div>
                                <div className="div">
                                    <img src="/img/svg/quote2.svg" alt="" />
                                </div>
                            </div>
                            <p className="author-comment">It is a long established fact that a reader will page
                                when
                                looking at its layout. The point of be distracted by the readable</p>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TestimonyCard;




