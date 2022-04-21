
import React, { useState, useContext, useEffect } from 'react';
import { SyncOutlined } from '@ant-design/icons';
import { Context } from "../../context/index"
import diasporaService from "../../services/diaspora/diasporaService";


const Loadmore = ({ type }) => {
    const [loading, setLoading] = useState(false);
    const { state, dispatch } = useContext(Context);
    const { confirmed_diaspora, page, pagination, has_more_data
    } = state;
    let records = [];
    if (type === 'confirmed-diaspora') {
        records = confirmed_diaspora;
    }

    const loadMore = async () => {
        setLoading(true)
        dispatch({
            type: "SET_PAGE",
            payload: ++page
        });

        const payload = {
            // page: 29,
            page,
            pagination,
            type
        };
        const data = await diasporaService.loadMoreRecords(payload);
        console.log({
            payload,
            diaspora: data.diaspora,
            confirmed_diaspora
        })
        dispatch({
            type: "CONFIRMED_DIASPORA",
            payload: [...confirmed_diaspora, ...data.diaspora]
        });

        if (data.count === 0) {
            dispatch({ type: "SET_HAS_MORE_DATA", payload: false })
        }
        //records = confirmed_diaspora;
        setLoading(false)
    }
    return (
        <>
            {records && records.length > 1 && (
                <button onClick={loadMore} className="btn btn-block bg-white btn-default btn-squared text-capitalize text-success text-bold loadMoreBtn"
                    disabled={loading}
                >
                    {loading ? (<><span><SyncOutlined spin /></span>Loading ...</>) : 'Load More'}
                </button>
            )}
        </>

    );
};
export default Loadmore;
