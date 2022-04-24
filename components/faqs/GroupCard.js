import { useContext, useState } from "react";
import { Modal, Alert, Button, Tag } from 'antd';
import { Context } from "../../context/index"
import { toast } from "react-toastify"
import { SyncOutlined, UserOutlined, ClockCircleFilled, GlobalOutlined, LockFilled, RocketOutlined } from '@ant-design/icons';

const GroupCard = ({ title }) => {

    const approuveFeed = () => {
        alert('approuveFeed')
    }

    const rejectFeed = () => {
        alert('rejectFeed')
    }

    const deleteFeed = () => {
        alert('deleteFeed')
    }

    return (
        <>
            <div className="col-md-4 mb-30">
                <div className="card bookmark bookmark--grid">
                    <div className="card-body px-50 py-50">
                        <div className="bookmark__body text-capitalize">
                            <h6 className="card-title group-title">{title}
                                {/* <span class="atbd-tag tag-secondary tag-transparented ml-3 ">English</span> */}
                            </h6>

                        </div>
                        <div className="bookmark__button d-flex mt-30 flex-wrap">
                            <div className="row">
                                <div className="col-md-4">
                                    <button className="btn btn-success btn-sm btn-squared border-0 " data-toggle="modal" data-target="#taskModal2">
                                        View
                                    </button>
                                </div>
                                <div className="col-md-4">
                                    <button className="btn btn-info btn-sm btn-squared border-0 " data-toggle="modal" data-target="#taskModal2">
                                        Edit
                                    </button>
                                </div>
                                <div className="col-md-4">
                                    <button className="btn btn-danger btn-sm btn-squared border-0 " data-toggle="modal" data-target="#taskModal2">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default GroupCard;


