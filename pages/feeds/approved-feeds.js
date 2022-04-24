import InnerMenu from "../../components/Navigation/InnerMenu";
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../context/index"
import Feed from "../../components/feeds/Feed"
import feedService from "../../services/feeds/feedService";
import Filter from "../../components/filters/index";
import Links from "../../lib/innerMenu";

const Feeds = () => {
    const { state, dispatch } = useContext(Context);
    const { current_page, feeds, feeds_count, page, pagination,
    } = state;
    const [lang, setLang] = useState('en');
    let type = 0;
    useEffect(() => {
        (async () => {
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

            dispatch({
                type: "SET_CURRENT_PAGE",
                payload: 'approved-feeds'
            });
        })();
    }, []);

    return (
        <>
            <InnerMenu links={Links.feedsLinks} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="breadcrumb-main user-member justify-content-sm-between ">
                            <div className=" d-flex flex-wrap justify-content-center breadcrumb-main__wrapper">
                                <div className="d-flex align-items-center user-member__title justify-content-center mr-sm-25">
                                    <h4 className="text-capitalize fw-500 breadcrumb-title pl-3">Approve Feeds ({feeds_count})</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <Filter filterType='lang' />
                    </div>
                </div>
                <div className="row">
                    {feeds && feeds.length > 0 && (feeds.map((feed, index) => {
                        return <Feed key={index} feed={feed} />
                    }))}

                </div>
            </div>

        </>
    );
};

export default Feeds;