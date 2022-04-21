import React from 'react';
import { Carousel } from 'antd';
import Link from "next/link"
import Router from 'next/router'

const Banner1 = ({ title, message, link, image, linkText }) => {
  return (
    <div className="col-xxl-3 col-sm-6 ">
      <div className="card banner-feature">
        <div className="card-body">
          <h1 className="banner-feature__heading">{title}</h1>
          <p className="banner-feature__para color-gray">{message}</p>
          <button className="banner-feature__btn btn btn btn-outline-primary btn-md px-20 radius-xs fs-15" type="button">{linkText ? linkText : 'View'}</button>
        </div>
      </div>
    </div>
  );
};

const Banner2 = ({ title, message, link, image, linkText }) => {
  return (
    <div className="col-xxl-3 col-sm-6">
      <div className="card banner-feature banner-feature--7">
        <div className="d-flex justify-content-center">
          <div className="card-body">
            <div className="banner-feature__shape mr-20">
              <img src={image} alt="img" className="svg" />
            </div>
            <div className="div">
              <h2 className="banner-feature__heading">{title}</h2>
              <p className="banner-feature__para ">{message}</p>
              <button onClick={(e) => { Router.push(link) }} className="banner-feature__btn btn btn btn-outline-primary btn-md px-20 radius-xs fs-15" type="button">{linkText ? linkText : 'View'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export {
  Banner1,
  Banner2,
};
