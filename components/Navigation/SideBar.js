import { Menu } from 'antd';
import Link from "next/link";
import { Home, LogOut, Briefcase, Layout, Users, Radio, Layers, List, User } from 'react-feather';
import { useState, useEffect, useContext } from 'react';
import { Context } from '../../context';
import { useRouter } from "next/router";

import { RocketOutlined, UserSwitchOutlined, WindowsOutlined, BarsOutlined } from '@ant-design/icons';

const SideBar = () => {
    const [current, setCurrent] = useState('');
    useEffect(() => {
        if (typeof window != "undefined") {
            setCurrent(window.location.pathname)
        }
    }, [typeof window != "undefined" && window.location.pathname]);

    const { state, dispatch } = useContext(Context);
    const { user } = state;
    const router = useRouter();
    const logOut = () => {
        dispatch({
            type: "LOGOUT"
        });
        window.localStorage.removeItem('user');
        fetch("/api/logout", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        });

        dispatch({
            type: "SET_COOKIE",
            payload: null
        })
        router.push('/login')


    }
    return (
        <>
            {user != null &&
                <aside className="sidebar">
                    <div className="sidebar__menu-group">
                        <div className=" bg-sidebar-menu">
                            <h6 className="">{user.name}</h6>
                            <span>{user.email}</span>
                        </div>
                        <ul className="sidebar_nav">

                            <li className="sidebar_menu_item" key="/dashboard" onClick={e => setCurrent(e.key)}>
                                <Link href="/dashboard">
                                    <a className={current === '/dashboard' ? 'active' : ''}>
                                        <Home className="nav-icon" />
                                        <span className="menu-text" >Dashboard </span>
                                    </a>
                                </Link>
                            </li>
                            {/* <li className="sidebar_menu_item" key="/landing-page" onClick={e => setCurrent(e.key)}>
                                <Link href="/landing-page">
                                    <a className={current === '/landing-page' ? 'active' : ''}>
                                        <Layout className="nav-icon" />
                                        <span className="menu-text">Landing Page</span>
                                    </a>
                                </Link>
                            </li> */}
                            <li className="sidebar_menu_item" key="/diaspora" onClick={e => setCurrent(e.key)}>
                                <Link href="/diaspora/non-confirmed-diaspora">
                                    <a className={(current === '/diaspora/non-confirmed-diaspora' || current === '/diaspora/confirmed-diaspora') ? 'active' : ''}>
                                        <User className="nav-icon" />
                                        <span className="menu-text">Diaspora</span>
                                    </a>
                                </Link>
                            </li>
                            <li className="sidebar_menu_item" key="/startups/non-confirmed-startups" onClick={e => setCurrent(e.key)}>
                                <Link href="/startups/non-confirmed-startups">
                                    <a className={(current === '/startups/non-confirmed-startups' || current === '/startups/confirmed-startups') ? 'active' : ''}>
                                        <RocketOutlined className="nav-icon" />
                                        <span className="menu-text">Startups</span>
                                    </a>
                                </Link>
                            </li>

                            <li className="sidebar_menu_item" key="/feeds" onClick={e => setCurrent(e.key)}>
                                <Link href="/feeds/approved-feeds">
                                    <a className={(current === '/feeds/approved-feeds' || current === '/feeds/non-approved-feeds') ? 'active' : ''}>
                                        <Radio className="nav-icon" />
                                        <span className="menu-text">Feeds</span>
                                    </a>
                                </Link>
                            </li>
                            {/* 
                            <li className="sidebar_menu_item" key="/blogs" onClick={e => setCurrent(e.key)}>
                                <Link href="/blogs">
                                    <a className={current === '/blogs' ? 'active' : ''}>
                                        <Layers className="nav-icon" />
                                        <span className="menu-text">Blog</span>
                                    </a>
                                </Link>
                            </li>

                            <li className="sidebar_menu_item" key="/news" onClick={e => setCurrent(e.key)}>
                                <Link href="/news">
                                    <a className={current === '/news' ? 'active' : ''}>
                                        <List className="nav-icon" />
                                        <span className="menu-text">News</span>
                                    </a>
                                </Link>
                            </li>

                            <li className="sidebar_menu_item" key="/jobs" onClick={e => setCurrent(e.key)}>
                                <Link href="/jobs">
                                    <a className={current === '/jobs' ? 'active' : ''}>
                                        <Briefcase className="nav-icon" />
                                        <span className="menu-text">Jobs</span>
                                    </a>
                                </Link>
                            </li>*/}
                            <li className="sidebar_menu_item" key="/users" onClick={e => setCurrent(e.key)}>
                                <Link href="/users">
                                    <a className={current === '/users' ? 'active' : ''}>
                                        <Users className="nav-icon" />
                                        <span className="menu-text">Users</span>
                                    </a>
                                </Link>
                            </li>
                            <li className="sidebar_menu_item" onClick={logOut}>
                                <Link href="#" >
                                    <a >
                                        <LogOut className="nav-icon" />
                                        <span className="menu-text">Logout</span>
                                    </a>
                                </Link>
                            </li>


                        </ul>
                    </div>
                </aside>}

        </>
    )
}

export default SideBar;