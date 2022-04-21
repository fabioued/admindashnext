import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import Link from "next/link"
const InnerMenu = ({ links }) => {
    const [current, setCurrent] = useState('');
    useEffect(() => {
        if (typeof window != "undefined") {
            setCurrent(window.location.pathname)
        }
    }, [typeof window != "undefined" && window.location.pathname]);

    return (
        <>
            <div className="navbar navbar-expand-lg inner-menu">
                <div className="">
                    <div className="col-md-12 ">
                        {links.map(function (item, index) {
                            return (<Link key={item.link} onClick={e => setCurrent(e.key)} href={item.link}>
                                <a className={`${current === item.link ? 'active' : ''} inner-menu-button`}>{item
                                    .name}</a></Link>)
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default InnerMenu;