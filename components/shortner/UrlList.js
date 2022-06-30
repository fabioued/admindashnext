import { useRouter } from "next/router"
import { Context } from "../../context/index"
import React, { useContext, useEffect, useState } from 'react';
import { CopyFilled, DeleteFilled } from '@ant-design/icons';

import shortnerService from "../../services/shortner/shortnerServices";


const UrlList = () => {

  const { state, dispatch } = useContext(Context);
  const { urls, urls_count } = state;


  const removeLink = async (id) => {
    const data = await shortnerService.removeLink(id);

    dispatch({
      type: "SET_LOADING",
      payload: true
    });
    const urls = await shortnerService.urlLists();
    dispatch({
      type: "SET_URLS",
      payload: urls
    });
    dispatch({
      type: "SET_URLS_COUNT",
      payload: urls.length
    });

    dispatch({
      type: "SET_LOADING",
      payload: false
    });
  }

  const copyToClipboard = (shortenedUrl) => {
    navigator.clipboard.writeText(shortenedUrl);
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  };

  return (
    <div>
      <div className="table-responsive">
        <table className="table getVerifiedTable mb-0 table-borderless table-rounded table table-striped">
          <thead>
            <tr className="userDatatable-header">
              {/* <th className="text-white">
                                                <span className="userDatatable-title float-right">User</span>
                                          </th> */}
              <th>
                <span className="userDatatable-title">#</span>
              </th>
              <th>
                <span className="userDatatable-title">Original </span>
              </th>

              <th>
                <span className="userDatatable-title">Shortened </span>
              </th>
              <th>
                <span className="userDatatable-title">Clicks</span>
              </th>
              <th data-type="html" data-name="position">
                <span className="userDatatable-title">Date</span>
              </th>
              <th data-type="html" data-name="position">
                <span className="userDatatable-title">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {urls &&
              urls.map(function (url, index) {
                return (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={index}
                  >
                    <td className="px-6 py-4">
                      {++index}
                    </td>
                    <td className="px-6 py-4">
                      <a href={url.originalUrl} className="text-blue-600">
                        {url.originalUrl}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <a href={url.shortenedUrl} className="text-blue-600">
                        {url.shortenedUrl}
                      </a>
                    </td>
                    <td className="px-6 py-4">{url.clicks}</td>
                    <td className="px-6 py-4">{url.createdAt.split("T")[0]}</td>
                    <td className="px-6 py-4 flex">
                      <button onClick={() => copyToClipboard(url.shortenedUrl)}>
                        <CopyFilled className="copyIcon" />
                      </button>
                      <button onClick={() => removeLink(url.id)}>
                        <DeleteFilled className="copyIcon" />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div >
  );
}
export default UrlList;
