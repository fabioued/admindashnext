import { useContext, useState } from "react";
import { Context } from "../../context/index"
import Image from "next/image"
import { toast } from "react-toastify"
import { SyncOutlined } from '@ant-design/icons';
import { Edit, Linkedin, Trash2, Mail } from 'react-feather';

const TestimonyCard = ({ testimonial }) => {

    return (
        <>
            <div className="col-md-6 mb-4">
                <div className="testimonial-slider2 testimonial-slider-global">
                    <div className="card">
                        <div className="card-body">
                            <div className="author-thumb mb-sm-6 mb-xs-3 d-flex justify-content-between">
                                <div className="d-flex flex-wrap">
                                    <div className="mr-20">
                                        <img className="wh-70 rounded-circle" src={testimonial.src} alt={testimonial.name} />
                                    </div>
                                    <div>
                                        <p className="mb-0">{testimonial.name} <span className="mx-2 atbd-tag tag-success tag-transparented">{testimonial.lang === 'en' ? 'English' : 'French'}</span></p>
                                        <span>{testimonial.position} -  {testimonial.company_name}</span>
                                    </div>
                                </div>
                                <div className="div">
                                    <img src="/img/svg/quote2.svg" alt="" />
                                </div>
                            </div>
                            <p className="author-comment">{testimonial.text}</p>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TestimonyCard;




