import React from 'react';
import { Carousel } from 'antd';
import Link from "next/link"
import Router from 'next/router'

const Statistic = ({ title, count, image, type }) => {
    if (!type) {
        type = 'primary'
    }
    return (
        <div class="col-xxl-3 col-lg-4 col-md-6 mb-25">
            <div class="feature-cards5 d-flex justify-content-between border-0 radius-xl bg-white p-25">
                <div class="application-task d-flex align-items-center">
                    <div class={`application-task-icon wh-60 bg-${type} content-center`}>
                        <img class="svg" src={image} alt="image" />
                    </div>
                    <div class="application-task-content">
                        <h4>{count}</h4>
                        <span class="text-light fs-14 mt-1 text-capitalize">{title}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistic;