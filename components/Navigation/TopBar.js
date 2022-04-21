import Link from "next/link";
import { Context } from '../../context';
import { useContext, useState, useRef, useCallback } from 'react';
import { Input, Space } from 'antd';
import diasporaService from "../../services/diaspora/diasporaService";

const { Search } = Input;
const TopNav = () => {
    const { state, dispatch } = useContext(Context);
    const { user, current_page, confirmed_diaspora, confirmed_diaspora_count } = state;
    const [query, setQuery] = useState('')
    const searchRef = useRef(null)


    const searchFunc = useCallback(async (event) => {

        // alert(query)

        if (event.key === 'Enter') {
            const data = await diasporaService.searchDiasporaRecord('fab');
            if (current_page === 'confirmed-diaspora') {
                //fliter
                let user_id = data.diaspora ? data.diaspora[0].users_id : null;
                if (user_id != null) {
                    let res = confirmed_diaspora.fliter(user => {
                        user.users_id === user_id;
                    })
                    console.log({
                        user_id,
                        res
                    })
                    dispatch({
                        type: "CONFIRMED_DIASPORA",
                        payload: res
                    });
                }

                dispatch({
                    type: "CONFIRMED_DIASPORA_COUNT",
                    payload: data.count
                });
            }

            // if (query.length) {
            //     const data = await diasporaService.searchDiasporaRecord(query);
            //     console.log({
            //         data
            //     });
            //     if (current_page === 'confirmed-diaspora') {
            //         dispatch({
            //             type: "CONFIRMED_DIASPORA",
            //             payload: data.diaspora
            //         });
            //     }
            //     // fetch(searchEndpoint(query))
            //     //     .then((res) => res.json())
            //     //     .then((res) => {
            //     //         setResults(res.results)
            //     //     })
            // }
        }


    }, [])


    return (
        <>
            {user != null && <header className="header-top">
                <nav className="navbar navbar-light">
                    <div className="navbar-left">
                        <Link href="/dashboard" >
                            <a className="sidebar-toggle">
                                <img className="svg" src="https://res.cloudinary.com/bantaba/image/upload/v1639454777/logo/PNG_2_ke6l2o.png" width="40" height="" alt="logo" />
                            </a>
                        </Link>
                        <Link href="/dashboard" >
                            <a className="navbar-brand">
                                Admin Dashboard
                            </a>
                        </Link>
                        <div
                            ref={searchRef}
                        >
                            <input
                                onChange={(e) => { setQuery(e.target.value) }}
                                placeholder='Search posts'
                                type='text'
                                onKeyPress={searchFunc}
                                value={query}
                            />
                        </div>

                        {/* <form action="/" className="search-form">
                            <span data-feather="search" />
                            <input className="form-control mr-sm-2 box-shadow-none" type="search"

                                onChange={onChange}

                                placeholder="Search..." aria-label="Search" />
                        </form> */}
                    </div>
                    <div className="navbar-right">
                        <ul className="navbar-right__menu">
                            <li className="nav-search d-none">
                                <a href="#" className="search-toggle">
                                    <i className="la la-search" />
                                    <i className="la la-times" />
                                </a>
                            </li>
                            {/* <li className="nav-author">
                                <div className="dropdown-custom">
                                    <div className="nav-author__info">
                                        <div className="author-img">
                                            <img src="https://thumbs.dreamstime.com/b/icon-profile-color-green-icon-profile-color-green-circle-color-dark-green-background-color-white-194702090.jpg" alt="" className="rounded-circle" />
                                        </div>
                                        <div>
                                            <h6>{user.name}</h6>
                                            <span>{user.email}</span>
                                        </div>
                                    </div>
                                </div>
                            </li> */}
                        </ul>
                        <div className="navbar-right__mobileAction d-md-none">
                            <a href="#" className="btn-search">
                                <span data-feather="search" />
                                <span data-feather="x" /></a>
                            <a href="#" className="btn-author-action">
                                <span data-feather="more-vertical" /></a>
                        </div>
                    </div>
                </nav>
            </header>}

        </>
    )
}

export default TopNav;