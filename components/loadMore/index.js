
import React, { useState, useContext, useEffect } from 'react';
import { SyncOutlined } from '@ant-design/icons';
import { Context } from "../../context/index"
import diasporaService from "../../services/diaspora/diasporaService";
import feedService from "../../services/feeds/feedService";



const Loadmore = ({ type, lang }) => {
    const [loading, setLoading] = useState(false);
    const { state, dispatch } = useContext(Context);
    const { confirmed_diaspora, confirmed_diaspora_count,
        feeds, feeds_count,
        page, pagination, has_more_data
    } = state;
    let records = [];
    if (type === 'confirmed-diaspora' || type === 'non-confirmed-diaspora') {
        records = confirmed_diaspora;
    } else if (type === '') {

    } else if (type === 'approved-feeds' || type === 'non-approved-feeds') {
        records = feeds;
    }

    const loadMore = async () => {
        let data;
        alert('lang')
        setLoading(true)
        dispatch({
            type: "SET_PAGE",
            payload: ++page
        });

        if (type === 'confirmed-diaspora' || type === 'non-confirmed-diaspora') {
            const payload = {
                // page: 29,
                page,
                pagination,
                type
            };
            data = await diasporaService.loadMoreRecords(payload);
            let count = confirmed_diaspora_count + data.count;
            dispatch({
                type: "CONFIRMED_DIASPORA",
                payload: [...confirmed_diaspora, ...data.diaspora]
            });

            dispatch({
                type: "CONFIRMED_DIASPORA_COUNT",
                payload: count
            });
        } else if (type === '') {

        } else if (type === 'approved-feeds' || type === 'non-approved-feeds') {
            data = await feedService.fetchFeeds({
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
            let count = confirmed_diaspora_count + data.count;
            dispatch({
                type: "CONFIRMED_DIASPORA",
                payload: [...confirmed_diaspora, ...data.diaspora]
            });

            dispatch({
                type: "CONFIRMED_DIASPORA_COUNT",
                payload: count
            });
        }

        if (data.count === 0) {
            dispatch({ type: "SET_HAS_MORE_DATA", payload: false })
        }
        //records = confirmed_diaspora;
        setLoading(false)
    }
    return (
        <>
            <button className="btn btn-block bg-white btn-default btn-squared text-capitalize text-success text-bold loadMoreBtn"
                disabled={loading}
            >
                {loading ? (<><span><SyncOutlined spin /></span>Loading ...</>) : 'Load More'}
            </button>
        </>

    );
};
export default Loadmore;
