
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Context } from "../../context/index"
import diasporaService from "../../services/diaspora/diasporaService";
import startupService from "../../services/startups/startupsService";
import feedService from "../../services/feeds/feedService";
import jobsService from "../../services/jobs/jobsService";
import newsService from "../../services/news/newsService";
import { DownOutlined, CaretDownOutlined } from '@ant-design/icons';
import { toast } from "react-toastify"
import { Circle } from 'react-feather';
import { Calendar } from "react-multi-date-picker";
import Footer from "react-multi-date-picker/plugins/range_picker_footer";
import Link from 'next/link';
import "react-multi-date-picker/styles/colors/teal.css"
import { Button } from 'antd';

const Filter = ({ filterType }) => {
    const { state, dispatch } = useContext(Context);
    const calendarRef = useRef();
    const { page, pagination, has_more_data
        , current_page, feeds, feeds_count } = state;

    const [openCalander, setOpenCalender] = useState(false);
    const [is_filter_opened, setOpenFilter] = useState(false);
    const [range, setRange] = useState('')
    const [lang, setLang] = useState('en');

    let type;
    //alert(current_page)
    if (current_page === 'confirmed-diaspora' || current_page === 'confirmed-startups') type = 0;
    if (current_page === 'non-confirmed-diaspora' || current_page === 'non-confirmed-startups') type = 1;

    const SetFilter = async (filterType) => {
        if (filterType === 'LastMonth' || filterType === "ResetFilter") {
            await fetchData(filterType);
        } else if (filterType === 'DateRange') {
            setOpenCalender(true);
        } else if (filterType === 'en' || filterType === 'fr') {
            lang = filterType;
            let type;
            if (current_page === 'approved-feeds' || current_page === 'non-approved-feeds') {
                current_page === 'approved-feeds' ? type = 0 : type = 1;
                dispatch({
                    type: "SET_LOADING",
                    payload: true
                });
                page = 0;
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
                dispatch({
                    type: "SET_LOADING",
                    payload: false
                });
            } else if (current_page === 'all-jobs') {
                dispatch({
                    type: "SET_LOADING",
                    payload: true
                });
                page = 0;
                const data = await jobsService.fetchJobs({
                    pagination, lang
                });
                dispatch({
                    type: "SET_JOBS",
                    payload: data.jobs
                });
                dispatch({
                    type: "SET_JOBS_COUNT",
                    payload: data.jobs.length
                });
                dispatch({
                    type: "SET_LOADING",
                    payload: false
                });
            }
            else if (current_page === 'all-news') {
                dispatch({
                    type: "SET_LOADING",
                    payload: true
                });
                page = 0;
                const data = await newsService.fetchNews({
                    pagination, lang
                });
                dispatch({
                    type: "SET_NEWS",
                    payload: data.news
                });
                dispatch({
                    type: "SET_NEWS_COUNT",
                    payload: data.news.length
                });
                dispatch({
                    type: "SET_LOADING",
                    payload: false
                });
            }
        }
        setOpenFilter(!is_filter_opened);
    }

    const fetchData = async (filterType) => {

        dispatch({
            type: "SET_LOADING",
            payload: true
        });
        let records;
        let set_data_type = '';
        let set_data_payload = [];
        let set_count_type = '';
        let set_count_payload = [];
        if (filterType === 'LastMonth') {
            let data = {
                page: 0,
                pagination,
            }
            if (current_page === 'confirmed-diaspora' || current_page === 'non-confirmed-diaspora') {
                records = await diasporaService.fetchLastMonthRecords(data);
                set_data_type = 'SET_DIASPORA';
                set_data_payload = records.diaspora;
                set_count_type = 'SET_DIASPORA_COUNT';
                set_count_payload = records.count;
            }
            else if (current_page === 'confirmed-startups' || current_page === 'non-confirmed-startups') {
                records = await startupService.fetchLastMonthRecords(data);
                set_data_type = 'SET_STARTUPS';
                set_data_payload = records.startups;
                set_count_type = 'SET_STARTUPS_COUNT';
                set_count_payload = records.count;
            }

        } else if (filterType === 'ResetFilter') {
            page = 0;
            let data = {
                page: 0,
                pagination,
                type
            }
            if (current_page === 'confirmed-diaspora' || current_page === 'non-confirmed-diaspora') {
                records = await diasporaService.fetchRecords(page, pagination, type);
                set_data_type = 'SET_DIASPORA';
                set_data_payload = records.diaspora;
                set_count_type = 'SET_DIASPORA_COUNT';
                set_count_payload = records.count;
            }
            else if (current_page === 'confirmed-startups' || current_page === 'non-confirmed-startups') {
                records = await startupService.fetchRecords(page, pagination, type);
                set_data_type = 'SET_STARTUPS';
                set_data_payload = records.startups;
                set_count_type = 'SET_STARTUPS_COUNT';
                set_count_payload = records.count;
            }

            else if (current_page === 'non-approved-feeds' || current_page === 'approved-feeds') {
                current_page === 'approved-feeds' ? type = 0 : type = 1;
                records = await feedService.fetchFeeds({
                    page: 0, pagination, type, lang
                });
                console.log({
                    records
                })
                set_data_type = 'SET_FEEDS';
                set_data_payload = records.feeds;
                set_count_type = 'SET_FEEDS_COUNT';
                set_count_payload = records.count;
            }

            else if (current_page === 'all-jobs') {
                records = await jobsService.fetchJobs({
                    pagination, lang
                });
                set_data_type = 'SET_JOBS';
                set_data_payload = records.jobs;
                set_count_type = 'SET_JOBS_COUNT';
                set_count_payload = records.jobs.length;
            }


            else if (current_page === 'all-news') {
                records = await newsService.fetchNews({
                    pagination, lang
                });
                set_data_type = 'SET_NEWS';
                set_data_payload = records.news;
                set_count_type = 'SET_NEWS_COUNT';
                set_count_payload = records.news.length;
            }



        }
        else if (filterType === 'DateRange') {
            if (range.length) {
                dispatch({
                    type: "SET_LOADING",
                    payload: true
                });
                const x = range[0];
                const y = range[1];

                const payload = {
                    startDate: x.format("YYYY-MM-DD"),
                    endDate: y.format("YYYY-MM-DD"),
                    page, pagination,
                    type
                };

                if (current_page === 'confirmed-diaspora' || current_page === 'non-confirmed-diaspora') {
                    records = await diasporaService.fetchDiasporaDateRange(payload);
                    set_data_type = 'SET_DIASPORA';
                    set_data_payload = records.diaspora;
                    set_count_type = 'SET_DIASPORA_COUNT';
                    set_count_payload = records.count;
                }
                else if (current_page === 'confirmed-startups' || current_page === 'non-confirmed-startups') {
                    records = await startupService.fetchStartupDateRange(payload);
                    set_data_type = 'SET_STARTUPS';
                    set_data_payload = records.startups;
                    set_count_type = 'SET_STARTUPS_COUNT';
                    set_count_payload = records.count;
                }
            } else {
                toast.error("Please select a date", {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
        }
        // if (records.totalCount) {
        //     dispatch({
        //         type: "SET_TOTAL_COUNT",
        //         payload: records.totalCount
        //     });
        // }

        dispatch({
            type: set_data_type,
            payload: set_data_payload
        });

        dispatch({
            type: set_count_type,
            payload: set_count_payload
        });
        dispatch({ type: "SET_HAS_MORE_DATA", payload: false })
        dispatch({
            type: "SET_LOADING",
            payload: false
        });
    }


    const applyCalendarFilter = async (filterType) => {
        //alert(filterType)
        await fetchData(filterType);
    }



    const CalendarToolbar = () => {
        return (<>
            <div className="row col-sm-12 offset-sm-1">
                <div className="col-md-3">
                    <Button type="primary" onClick={() => { setRange('') }} className="btn-block calendar-toolbar calendar-toolbar-reset  m-2 px-3" >Reset</Button>
                </div>
                <div className="col-md-3">
                    <Button type="primary" onClick={() => { applyCalendarFilter('DateRange') }} className="btn-block calendar-toolbar calendar-toolbar-submit m-2 px-3" >Submit</Button>
                </div>
                <div className="col-md-3">
                    <Button type="primary" onClick={() => { setRange(''); setOpenCalender(false); }} className="btn-block calendar-toolbar calendar-toolbar-close  m-2 px-3" >Close</Button>
                </div>
            </div></>)
    }

    return (
        <>
            <div className="col-lg-5">
                <div className="breadcrumb-main " style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div className="dropdown">
                        <a class="btn-link text-black" href="#" onClick={() => { setOpenFilter(!is_filter_opened); setOpenCalender(false); }}>
                            Filter
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </a>
                        {is_filter_opened && filterType === "lang" && (
                            <div className="dropdown-default">
                                <Link href="#" passHref><a onClick={() => { SetFilter('en'); }} className="dropdown-item"><Circle size={10} color={"#349E4D"} /> English</a></Link>
                                <Link href="#" passHref><a onClick={() => { SetFilter('fr'); }} className="dropdown-item"><Circle size={10} color={"#349E4D"} /> French</a></Link>
                                <a className="dropdown-item" onClick={() => SetFilter('ResetFilter')}><Circle size={10} color={"#349E4D"} /> Reset Filter</a>
                            </div>)}

                        {is_filter_opened && filterType === "calendar" && (
                            <div className="dropdown-default">
                                <a className="dropdown-item" onClick={() => SetFilter('LastMonth')}><Circle size={10} color={"#349E4D"} /> Last Month</a>
                                <a className="dropdown-item" onClick={() => SetFilter('DateRange')}><Circle size={10} color={"#349E4D"} /> Date Range</a>
                                <a className="dropdown-item" onClick={() => SetFilter('ResetFilter')}><Circle size={10} color={"#349E4D"} /> Reset Filter</a>
                            </div>)}
                        <div>
                            <Calendar
                                className={`teal  filterCalendar ${openCalander ? "block" : "hidden"
                                    }`}
                                range
                                ref={calendarRef}
                                numberOfMonths={2}
                                format={"YYYY/MM/DD"}
                                value={range}
                                // onChange={setRange}
                                onChange={setRange}

                                plugins={[<Footer position="top"
                                />,
                                <CalendarToolbar position="bottom" />
                                ]}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};
export default Filter;
