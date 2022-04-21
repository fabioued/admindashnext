import { Menu } from 'antd';
import Link from "next/link";
import { Home, LogOut, Briefcase, Layout, Users, Radio, Grid } from 'react-feather';
import { useState, useEffect, useContext } from 'react';
import { Context } from '../../context';
import { useRouter } from "next/router";


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

                            <li key="/dashboard" onClick={e => setCurrent(e.key)}>
                                <Link href="/dashboard">
                                    <a className={current === '/dashboard' ? 'active' : ''}>
                                        <Home className="nav-icon" />
                                        <span className="menu-text" >Dashboard </span>
                                    </a>
                                </Link>
                            </li>
                            <li key="/landing-page" onClick={e => setCurrent(e.key)}>
                                <Link href="/landing-page">
                                    <a className={current === '/landing-page' ? 'active' : ''}>
                                        <Layout className="nav-icon" />
                                        <span className="menu-text">Landing Page</span>
                                    </a>
                                </Link>
                            </li>
                            <li key="/diaspora" onClick={e => setCurrent(e.key)}>
                                <Link href="/diaspora/non-confirmed-diaspora">
                                    <a className={current === '/diaspora/non-confirmed-diaspora' ? 'active' : ''}>
                                        <svg className="nav-icon" id="Group_15918" data-name="Group 15918" xmlns="http://www.w3.org/2000/svg" width="42.948" height="49.148" viewBox="0 0 42.948 49.148">
                                            <path id="Path_10391" data-name="Path 10391" d="M1647.1,1073.819h-1.235a3.418,3.418,0,0,0-3.589,3.591c0,.253,0,.506,0,.8-.752-.1-1.47-.192-2.185-.3a32.7,32.7,0,0,1-6.155-1.423,15.682,15.682,0,0,1-1.983-.889,4.594,4.594,0,0,1-.975-.748,1.385,1.385,0,0,1-.434-1.227c.073-.652.047-1.319.161-1.962a5.088,5.088,0,0,1,3.014-3.784,20.358,20.358,0,0,1,4.224-1.343c1.905-.464,3.812-.928,5.71-1.422a9.322,9.322,0,0,0,1.392-.552,2.527,2.527,0,0,0,1.523-2.7,2.8,2.8,0,0,0-.605-1.563,12.849,12.849,0,0,1-1.928-3.884c-.143-.478-.209-.978-.331-1.463a.772.772,0,0,0-.217-.317,5.334,5.334,0,0,1-.536-.5,6.469,6.469,0,0,1-1.253-4.884,4.775,4.775,0,0,1,.313-.815,1.173,1.173,0,0,0,.061-.445,12.326,12.326,0,0,1,.771-5.406,8.236,8.236,0,0,1,3.27-3.8,10.62,10.62,0,0,1,13.864,1.824,8.162,8.162,0,0,1,1.811,4.19,12.724,12.724,0,0,1,.139,3.345.37.37,0,0,0,.027.224,3.272,3.272,0,0,1,.414,2.325,6.852,6.852,0,0,1-.886,2.844,3.34,3.34,0,0,1-1,1.139.661.661,0,0,0-.2.423,12.046,12.046,0,0,1-1.746,4.5c-.223.37-.492.71-.723,1.075a2.744,2.744,0,0,0,.885,3.732,10.553,10.553,0,0,0,2.92,1.067c2.171.535,4.349,1.045,6.516,1.6a9.8,9.8,0,0,1,2.915,1.235,5.044,5.044,0,0,1,2.359,3.916c.057.546.063,1.1.08,1.646a1.174,1.174,0,0,1-.412.945,7.778,7.778,0,0,1-1.3.951,16.957,16.957,0,0,1-4.243,1.465,49.764,49.764,0,0,1-5.793.977c0-.343.011-.672,0-1a3.369,3.369,0,0,0-1.912-3.026,3.214,3.214,0,0,0-1.563-.352c-.439,0-.878,0-1.346,0v-1.3A3.412,3.412,0,0,0,1653.4,1069c-.953,0-1.905,0-2.858,0a3.411,3.411,0,0,0-3.443,3.438C1647.1,1072.878,1647.1,1073.32,1647.1,1073.819Z" transform="translate(-1630.53 -1037)" fill="#b5bad0" />
                                            <path id="Path_10392" data-name="Path 10392" d="M1660.075,1107.364h-.348q-1.621,0-3.241,0a1.127,1.127,0,0,1-1.234-1.222q0-1.37,0-2.74a1.119,1.119,0,0,1,1.222-1.228q1.621,0,3.241,0h.359v-.335c0-1.09,0-2.181,0-3.271a1.117,1.117,0,0,1,1.2-1.218q1.4-.005,2.8,0a1.113,1.113,0,0,1,1.188,1.2c0,1.09,0,2.181,0,3.271v.349h.346q1.635,0,3.271,0a1.116,1.116,0,0,1,1.207,1.214q0,1.385,0,2.769a1.122,1.122,0,0,1-1.218,1.207c-1.187,0-2.374,0-3.605,0v.329q0,1.635,0,3.271a1.121,1.121,0,0,1-1.2,1.222q-1.4.01-2.8,0a1.116,1.116,0,0,1-1.189-1.206C1660.073,1109.791,1660.075,1108.6,1660.075,1107.364Z" transform="translate(-1641.198 -1063.042)" fill="#b5bad0" />
                                        </svg>
                                        <span className="menu-text">Diaspora</span>
                                    </a>
                                </Link>
                            </li>
                            <li key="/startups" onClick={e => setCurrent(e.key)}>
                                <Link href="/startups">
                                    <a className={current === '/startups' ? 'active' : ''}>
                                        <svg className="nav-icon" id="Group_35756" data-name="Group 35756" xmlns="http://www.w3.org/2000/svg" width="31.995" height="50.562" viewBox="0 0 31.995 50.562">
                                            <path id="Path_37733" data-name="Path 37733" d="M725.622,747.824a6.976,6.976,0,0,1,.682.466,25.178,25.178,0,0,1,9,21.057,34.6,34.6,0,0,1-3.355,12.894.9.9,0,0,1-.912.573q-5.494-.012-10.987,0a.914.914,0,0,1-.927-.589,35.462,35.462,0,0,1-3.043-9.876,26.7,26.7,0,0,1,1.332-13.795,25.893,25.893,0,0,1,7.646-10.507,2.8,2.8,0,0,1,.359-.223Zm-.041,9.738a4.247,4.247,0,1,0,4.2,4.351A4.249,4.249,0,0,0,725.581,757.562Zm2.29,14.507a2.332,2.332,0,1,0-2.32,2.345A2.328,2.328,0,0,0,727.87,772.069Z" transform="translate(-709.531 -747.824)" fill="#b5bad0" />
                                            <path id="Path_37734" data-name="Path 37734" d="M732.255,884.827a3.3,3.3,0,0,0,.394.391c.138.118.25.116.31-.095.075-.264.172-.522.26-.783l.084,0a7.631,7.631,0,0,1,.064.809,3.932,3.932,0,0,0,.874,2.555c.442.575.868,1.164,1.263,1.771A4.961,4.961,0,0,1,736.587,892h.325a6.55,6.55,0,0,0,1.595-3.647c.029-.4.008-.794.035-1.189.052-.739.111-1.479.194-2.215a1.779,1.779,0,0,1,.224-.5l.11.026c.015.137.026.274.047.409a3.945,3.945,0,0,0,.148.789.716.716,0,0,0,.383.411c.106.03.282-.183.423-.292a.371.371,0,0,0,.073-.1,16.086,16.086,0,0,0,1.552-3.176,4.24,4.24,0,0,0-1.884-5.078c-.189-.119-.427-.322-.642-.14-.23.195-.065.464.005.705a5.625,5.625,0,0,1,.28,1.118,3.65,3.65,0,0,1-.624,2.475,1.815,1.815,0,0,1-.4.313,2.17,2.17,0,0,1-.228-.427c-.1-.369-.178-.746-.264-1.119a6.347,6.347,0,0,0-.323.873,8.213,8.213,0,0,1-.9,2.139c-.276.412-.462.414-.732.007a12.333,12.333,0,0,1-1.394-2.856,1.441,1.441,0,0,1-.065-.321c-.035-.344-.075-.371-.344-.17a.269.269,0,0,1-.446-.071,5.568,5.568,0,0,1-.332-.623c-.231-.506-.438-1.023-.681-1.523-.18-.37-.3-.4-.568-.09a10.964,10.964,0,0,0-1.08,1.457,3.7,3.7,0,0,0-.168,3.475A8.532,8.532,0,0,0,732.255,884.827Z" transform="translate(-720.258 -841.44)" fill="#b5bad0" />
                                            <path id="Path_37735" data-name="Path 37735" d="M693.312,851.115a14.7,14.7,0,0,1,2.474-8.212,14.025,14.025,0,0,1,1.6-1.819.769.769,0,0,1,1.336.444,37.663,37.663,0,0,0,2.5,7.467.788.788,0,0,1-.526,1.183,15.2,15.2,0,0,0-1.746.661,5.972,5.972,0,0,0-3.267,4.319c-.061.263-.108.529-.16.793a.7.7,0,0,1-.663.622.741.741,0,0,1-.8-.528A16.066,16.066,0,0,1,693.312,851.115Z" transform="translate(-693.312 -815.105)" fill="#b5bad0" />
                                            <path id="Path_37736" data-name="Path 37736" d="M788.084,851.526a14.092,14.092,0,0,1-.7,4.492.751.751,0,0,1-.613.567.707.707,0,0,1-.862-.612,9.577,9.577,0,0,0-.682-2.323,6.076,6.076,0,0,0-3.768-3.229c-.262-.091-.531-.166-.8-.25a.756.756,0,0,1-.489-1.085,37.854,37.854,0,0,0,2.546-7.61.772.772,0,0,1,1.267-.429,10.232,10.232,0,0,1,2.473,3.235A15.25,15.25,0,0,1,788.084,851.526Z" transform="translate(-756.094 -815.127)" fill="#b5bad0" />
                                        </svg>

                                        <span className="menu-text">Startups</span>
                                    </a>
                                </Link>
                            </li>

                            <li key="/feeds" onClick={e => setCurrent(e.key)}>
                                <Link href="/feeds">
                                    <a className={current === '/feeds' ? 'active' : ''}>
                                        <Radio className="nav-icon" />
                                        <span className="menu-text">Feeds</span>
                                    </a>
                                </Link>
                            </li>

                            <li key="/blogs" onClick={e => setCurrent(e.key)}>
                                <Link href="/blogs">
                                    <a className={current === '/blogs' ? 'active' : ''}>
                                        <Grid className="nav-icon" />
                                        <span className="menu-text">Blog</span>
                                    </a>
                                </Link>
                            </li>

                            <li key="/news" onClick={e => setCurrent(e.key)}>
                                <Link href="/news">
                                    <a className={current === '/news' ? 'active' : ''}>
                                        <svg className="nav-icon" xmlns="http://www.w3.org/2000/svg" width="40.5" height="27" viewBox="0 0 40.5 27">
                                            <path id="Icon_awesome-newspaper" data-name="Icon awesome-newspaper" d="M38.813,4.5H6.188A1.687,1.687,0,0,0,4.5,6.188V6.75H1.688A1.687,1.687,0,0,0,0,8.438V27.563A3.937,3.937,0,0,0,3.938,31.5H37.125A3.375,3.375,0,0,0,40.5,28.125V6.188A1.687,1.687,0,0,0,38.813,4.5ZM3.938,28.125a.563.563,0,0,1-.562-.562V10.125H4.5V27.563A.563.563,0,0,1,3.938,28.125ZM20.531,27H9.844A.844.844,0,0,1,9,26.156v-.562a.844.844,0,0,1,.844-.844H20.531a.844.844,0,0,1,.844.844v.563A.844.844,0,0,1,20.531,27Zm14.625,0H24.469a.844.844,0,0,1-.844-.844v-.562a.844.844,0,0,1,.844-.844H35.156a.844.844,0,0,1,.844.844v.563A.844.844,0,0,1,35.156,27ZM20.531,20.25H9.844A.844.844,0,0,1,9,19.406v-.562A.844.844,0,0,1,9.844,18H20.531a.844.844,0,0,1,.844.844v.563A.844.844,0,0,1,20.531,20.25Zm14.625,0H24.469a.844.844,0,0,1-.844-.844v-.562A.844.844,0,0,1,24.469,18H35.156a.844.844,0,0,1,.844.844v.563A.844.844,0,0,1,35.156,20.25Zm0-6.75H9.844A.844.844,0,0,1,9,12.656V9.844A.844.844,0,0,1,9.844,9H35.156A.844.844,0,0,1,36,9.844v2.813A.844.844,0,0,1,35.156,13.5Z" transform="translate(0 -4.5)" fill="#b5bad0" />
                                        </svg>
                                        <span className="menu-text">News</span>
                                    </a>
                                </Link>
                            </li>

                            <li key="/jobs" onClick={e => setCurrent(e.key)}>
                                <Link href="/jobs">
                                    <a className={current === '/jobs' ? 'active' : ''}>
                                        <Briefcase className="nav-icon" />
                                        <span className="menu-text">Jobs</span>
                                    </a>
                                </Link>
                            </li>
                            <li key="/users" onClick={e => setCurrent(e.key)}>
                                <Link href="/users">
                                    <a className={current === '/users' ? 'active' : ''}>
                                        <Users className="nav-icon" />
                                        <span className="menu-text">Users</span>
                                    </a>
                                </Link>
                            </li>
                            <li onClick={logOut}>
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