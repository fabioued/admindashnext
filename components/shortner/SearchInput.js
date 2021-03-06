import { Context } from "../../context/index"
import React, { useContext, useEffect, useState } from 'react';
import shortnerService from "../../services/shortner/shortnerServices";
import { Alert } from 'antd';

const SearchInput = () => {

  const { state, dispatch } = useContext(Context);

  const { loading, link_info_visible, errors, newShortenedUrl } = state;

  const [urlInput, setUrlInput] = useState("");

  const shortenUrl = async () => {
    //setErrors(null);
    dispatch({
      type: "SET_LOADING",
      payload: true
    });

    const res = await shortnerService.shortenUrl(urlInput);
    console.log({ create: res })

    if (res.status === 400) {

      dispatch({
        type: "SET_ERRORS",
        payload: res.data.message
      });

      dispatch({
        type: "SET_LinkInfo_VISIBLE",
        payload: false
      });
    }
    if (res.shortenedUrl) {
      setUrlInput("");
      dispatch({
        type: "SET_NEW_SHORTENED_URL",
        payload: res.shortenedUrl
      });
      dispatch({
        type: "SET_ERRORS",
        payload: null
      });

      const data = await shortnerService.urlLists();

      dispatch({
        type: "SET_URLS",
        payload: data
      });
      dispatch({
        type: "SET_URLS_COUNT",
        payload: data.length
      });

      dispatch({
        type: "SET_LinkInfo_VISIBLE",
        payload: true
      });
    }
    dispatch({
      type: "SET_LOADING",
      payload: false
    });
  };

  return (
    <div role="form">
      <form className="w-5/6 md:w-2/4" onSubmit={(e) => shortenUrl(e)}>
        <div className="row m-50">
          <div className="col-xs-12">
            <div className="input-group input-group-lg">
              <input
                type="link"
                id="default-search"
                className="form-control shortnerInput"
                placeholder="Paste your URL here"
                required
                onChange={(e) => setUrlInput(e.target.value)}
                value={urlInput}
              />
              <div className="input-group-btn">
                <button type="submit" className="btn btn-success ml-10 btn-lg px-20">
                  {loading && (
                    <span>
                      <svg
                        role="status"
                        className="inline w-4 h-4 mr-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                      Shortening...
                    </span>
                  )}
                  {!loading && "Shorten"}

                </button>




              </div>
            </div>
            {errors && (
              <div>
                <Alert
                  message="Error"
                  description={errors}
                  type="error"
                  closable
                  className="p-3 my-3 center"
                />
              </div>

            )}
          </div>
        </div>
      </form>
    </div>

  );
}

export default SearchInput;
