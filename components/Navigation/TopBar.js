import Link from "next/link";
import { Context } from '../../context';
import { useContext, useState, useRef, useEffect } from 'react';
import diasporaService from "../../services/diaspora/diasporaService";
import startupService from "../../services/startups/startupsService";
import feedService from "../../services/feeds/feedService";
import { toast } from "react-toastify"
import { CloseCircleOutlined, CloseCircleFilled } from '@ant-design/icons';

const TopNav = () => {
    const { state, dispatch } = useContext(Context);
    const { user, current_page,
        confirmed_diaspora,
        confirmed_diaspora_count, page, pagination, has_more_data,
        feeds_count, feeds
    } = state;
    const [query, setQuery] = useState('');
    const searchRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [showClearButton, setShowClearButton] = useState(false);
    const [showSearcbar, setShowSearcbar] = useState(false);

    useEffect(() => {
        (async () => {
            if (current_page && current_page != 'dashboard' && current_page != 'landing-page') {
                setShowSearcbar(true)
            }
        })();
    }, [current_page]);


    const search = (async (event) => {
        event.preventDefault();
        try {
            if (query.length) {
                dispatch({
                    type: "SET_LOADING",
                    payload: true
                });
                if (current_page === 'confirmed-diaspora' || current_page === 'non-confirmed-diaspora') {
                    const data = await diasporaService.searchDiasporaRecord(query)
                    dispatch({
                        type: "SET_DIASPORA",
                        payload: data.diaspora
                    });

                    dispatch({
                        type: "SET_DIASPORA_COUNT",
                        payload: data.count
                    });

                } else if (current_page === 'confirmed-startups' || current_page === 'non-confirmed-startups') {
                    const data = await startupService.searchStartupsRecord(query)
                    dispatch({
                        type: "SET_STARTUPS",
                        payload: data.startups
                    });

                    dispatch({
                        type: "SET_STARTUPS_COUNT",
                        payload: data.count
                    });

                }

                else if (current_page === "approved-feeds" || current_page === "non-approved-feeds") {

                    const data = await feedService.searchFeeds(query)
                    dispatch({
                        type: "SET_FEEDS",
                        payload: data.feeds
                    });

                    dispatch({
                        type: "SET_FEEDS_COUNT",
                        payload: data.count
                    });
                }
                dispatch({
                    type: "SET_LOADING",
                    payload: false
                });

                dispatch({ type: "SET_HAS_MORE_DATA", payload: false })
            }

        } catch (err) {
            dispatch({
                type: "SET_LOADING",
                payload: false
            });
            let message = err.message;
            // console.log({ err });
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT
            })

        }
    })

    const clear = async (e) => {
        setQuery('');
        setShowClearButton(false);
        dispatch({
            type: "SET_LOADING",
            payload: true
        });
        let type = 0;
        if (current_page === 'confirmed-diaspora') {
            const data = await diasporaService.fetchRecords(page, pagination, type);
            dispatch({
                type: "SET_DIASPORA",
                payload: data.diaspora
            });
            dispatch({
                type: "SET_DIASPORA_COUNT",
                payload: data.count
            });
            data.count > 0 ? dispatch({ type: "SET_HAS_MORE_DATA", payload: true }) : dispatch({ type: "SET_HAS_MORE_DATA", payload: false })

        } else if (current_page === 'approved-feeds' || current_page === 'non-approved-feeds') {
            current_page === 'approved-feeds' ? type = 0 : type = 1;
            let lang = 'en';
            const data = await feedService.fetchFeeds({
                page, pagination, type, lang
            });
            dispatch({
                type: "SET_FEEDS",
                payload: data.feeds
            });
            dispatch({
                type: "SET_FEEDS_COUNT",
                payload: data.count
            });

            feeds_count > 0 ? dispatch({ type: "SET_HAS_MORE_DATA", payload: true }) : dispatch({ type: "SET_HAS_MORE_DATA", payload: false })
        }

        dispatch({
            type: "SET_LOADING",
            payload: false
        });
    }


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

                        {showSearcbar && <div className="search-container" ref={searchRef}>
                            <form onSubmit={search}>
                                <input
                                    onChange={(e) => { setQuery(e.target.value); setShowClearButton(true); }}
                                    type="text"
                                    className="form-control"
                                    placeholder="Search here.."
                                    name="search"
                                    value={query} />
                                {showClearButton && <CloseCircleOutlined className="clear-form" style={{ color: '#E2E2E2' }} onClick={clear} />}

                                <button type="submit" className="search-button" disabled={loading}>
                                    {loading ? <i class="fas fa-spinner fa-spin"></i> : <i className="fa fa-search"></i>}
                                </button>
                            </form>
                        </div>}
                    </div>
                </nav>
            </header>}

        </>
    )
}

export default TopNav;