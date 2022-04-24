import { useRouter } from "next/router"
import React, { useContext, useEffect, useRef, useState } from 'react';
import Link from "next/link";
import { Carousel } from 'antd';
import { ArrowLeftCircle, ArrowRightCircle } from 'react-feather';

const InnerMenu = ({ links }) => {
    const [current, setCurrent] = useState('');
    const menuRef = useRef(null);
    useEffect(() => {
        if (typeof window != "undefined") {
            setCurrent(window.location.pathname)
        }
    }, [typeof window != "undefined" && window.location.pathname]);

    let numToShow;

    if (links.length > 6) {
        numToShow = 6;
    } else {
        numToShow = links.length;
    }

    const settings = {
        dots: false,
        initialSlide: 0,
        infinite: true,
        autoplay: false,
        speed: 500,
        slidesToShow: numToShow,
        slidesToScroll: 5,
        variableWidth: true,
        swipeToSlide: true,
        adaptiveHeight: true,
        nextArrow: <ArrowRightCircle color='#000' size="24" />,
        prevArrow: <ArrowLeftCircle color='#000' size="24" />
    };

    return (
        <>
            <div className="navbar navbar-expand-lg inner-menu">
                <div className="col-md-12">
                    <Carousel autoplay arrows   {...settings} className="inner-menu-carousel">
                        {links.map(function (item, index) {
                            return (
                                <div>
                                    <Link key={index} onClick={e => setCurrent(e.key)} href={item.link}>
                                        <a className={`${current === item.link ? 'active' : ''} inner-menu-button`}>{item
                                            .name}</a></Link>
                                </div>
                            )
                        })}
                    </Carousel>
                </div>
            </div>
        </>
    );
};

export default InnerMenu;