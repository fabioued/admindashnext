import Link from "next/link";
import { Context } from '../../context';
import { useContext, useState, useRef, useEffect } from 'react';
import diasporaService from "../../services/diaspora/diasporaService";
import { toast } from "react-toastify"
import { CloseCircleOutlined, CloseCircleFilled } from '@ant-design/icons';

const TopNav = () => {
    const { state, dispatch } = useContext(Context);
    const { user, current_page, confirmed_diaspora, confirmed_diaspora_count, page, pagination, has_more_data
    } = state;
    const [query, setQuery] = useState('');
    const searchRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [showClearButton, setShowClearButton] = useState(false);
    const [showSearcbar, setShowSearcbar] = useState(false);

    useEffect(() => {
        (async () => {
            if (current_page === 'dashboard' || current_page === 'landing-page') {
                setShowSearcbar(false);
            } else {
                setShowSearcbar(true);
            }
        })();
    }, []);

    const search = (async (event) => {
        event.preventDefault();
        try {
            if (query.length) {
                setLoading(true)
                if (current_page === 'confirmed-diaspora') {
                    const data = await diasporaService.searchDiasporaRecord(query)
                    dispatch({
                        type: "CONFIRMED_DIASPORA",
                        payload: data.diaspora
                    });

                    dispatch({
                        type: "CONFIRMED_DIASPORA_COUNT",
                        payload: data.count
                    });

                }
                setLoading(false)
            }

        } catch (err) {
            setLoading(false)
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
        let type = 0;
        if (current_page === 'confirmed-diaspora') {
            const data = await diasporaService.fetchRecords(page, pagination, type);
            dispatch({
                type: "CONFIRMED_DIASPORA",
                payload: data.diaspora
            });
            dispatch({
                type: "CONFIRMED_DIASPORA_COUNT",
                payload: data.count
            });
            data.count > 0 ? dispatch({ type: "SET_HAS_MORE_DATA", payload: true }) : dispatch({ type: "SET_HAS_MORE_DATA", payload: false })

        }
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