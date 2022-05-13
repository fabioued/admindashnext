import { useContext, useState } from "react";
import { Modal, Alert, Button, Tag } from 'antd';
import { Context } from "../../context/index"
import { toast } from "react-toastify"
import { SyncOutlined, UserOutlined, ClockCircleFilled, GlobalOutlined, LockFilled, RocketOutlined } from '@ant-design/icons';

const EmptyCard = ({ text }) => {
    return (
        <>
            <div className="card card-default card-md mb-4">
                <div className="card-body">
                    <div className="atbd-empty text-center">
                        <div className="atbd-empty__image">

                            <img src="/img/folders/1.svg" alt="Admin Empty" />

                        </div>
                        <div className="atbd-empty__text">

                            <p className="">{text}</p>

                        </div>
                    </div>


                </div>
            </div>
        </>
    );
};

export default EmptyCard;



