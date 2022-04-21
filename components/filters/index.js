
import React, { useState, useContext, useEffect } from 'react';
import { Context } from "../../context/index"
import diasporaService from "../../services/diaspora/diasporaService";
import { DownOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Circle } from 'react-feather';

const Filter = ({ type }) => {
    const [loading, setLoading] = useState(false);
    const { state, dispatch } = useContext(Context);
    const { confirmed_diaspora, confirmed_diaspora_count, page, pagination, has_more_data
    } = state;

    const SetFilter = async (type) => {
        alert(type)
    }
    return (
        <>
            <div className="col-lg-5">
                <div className="breadcrumb-main " style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div className="dropdown dropdown-hover">
                        <a class="btn-link" href="">
                            Filter
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </a>
                        <div className="dropdown-default">
                            <a className="dropdown-item" onClick={() => SetFilter('LastMonth')}><Circle size={10} color={"#349E4D"} /> Last Month</a>
                            <a className="dropdown-item" onClick={() => SetFilter('DateRange')}><Circle size={10} color={"#349E4D"} /> Date Range</a>
                            <a className="dropdown-item" onClick={() => SetFilter('ResetFilter')}><Circle size={10} color={"#349E4D"} /> Reset Filter</a>

                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};
export default Filter;
