
import React, { useState, useContext, useEffect } from 'react';
import { Context } from "../../context/index"
import diasporaService from "../../services/diaspora/diasporaService";
import { DownOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Circle } from 'react-feather';
import { Calendar } from "react-multi-date-picker";

const Filter = ({ type, filterType }) => {
    const { state, dispatch } = useContext(Context);
    const [openCalander, setOpenCalender] = useState(false);
    const [loading, setLoading] = useState(false);
    const [range, setRange] = useState("");
    const { confirmed_diaspora, confirmed_diaspora_count, page, pagination, has_more_data
        , current_page } = state;

    const SetFilter = async (type) => {
        if (type === 'LastMonth') {
            if (current_page === 'confirmed-diaspora') {
                let data = {
                    page,
                    pagination,
                }
                const records = await diasporaService.fetchLastMonthRecords(data);
                dispatch({
                    type: "CONFIRMED_DIASPORA",
                    payload: records.diaspora
                });

                dispatch({
                    type: "CONFIRMED_DIASPORA_COUNT",
                    payload: records.count
                });

                if (records.count === 0) {
                    dispatch({ type: "SET_HAS_MORE_DATA", payload: false })
                }
            }


        } else if (type === 'DateRange') {

            setOpenCalender(true);

            // useEffect(() => {
            //     if (range.length > 1) {
            //         const x = new Date(range[0]);
            //         const y = new Date(range[1]);
            //         const startDate = standardDateFormat(x);
            //         const endDate = standardDateFormat(y);
            //         const payload = {
            //             startDate,
            //             endDate,
            //             page: 0,
            //         };
            //         // dispatch(fetchDiasporaDateRange(payload));
            //         setOpenCalender(false);
            //         // setOpenFilter(false);
            //         setRange("");
            //     }
            // }, [range]);

        } else {
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

                dispatch({
                    type: "SET_CURRENT_PAGE",
                    payload: 'confirmed-diaspora'
                });
                data.count > 0 ? dispatch({ type: "SET_HAS_MORE_DATA", payload: true }) : dispatch({ type: "SET_HAS_MORE_DATA", payload: false })
            }

        }
    }
    return (
        <>
            <div className="col-lg-5">
                <div className="breadcrumb-main " style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div className="dropdown dropdown-hover">
                        <a class="btn-link" href="#">
                            Filter
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </a>
                        <div className="dropdown-default">
                            <a className="dropdown-item" onClick={() => SetFilter('LastMonth')}><Circle size={10} color={"#349E4D"} /> Last Month</a>
                            <a className="dropdown-item" onClick={() => SetFilter('DateRange')}><Circle size={10} color={"#349E4D"} /> Date Range</a>
                            <a className="dropdown-item" onClick={() => SetFilter('ResetFilter')}><Circle size={10} color={"#349E4D"} /> Reset Filter</a>

                        </div>

                        <div
                            className={`absolute right-10 mt-1 z-50 ${openCalander ? "showCalendar" : "hideCalendar"}`}>
                            <Calendar
                                range
                                numberOfMonths={2}
                                plugins={[]}
                                value={range}
                                onChange={setRange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};
export default Filter;
