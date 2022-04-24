import { useReducer, createContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";


const initialState = {
    user: null,
    confirmed_diaspora: [],
    feeds: [],
    confirmed_diaspora_count: 0,
    feeds_count: 0,
    open: false,
    modal_is_open: false,
    has_more_data: false,
    loading: true,
    modal_name: '',
    viewing_user: {},
    page: 0,
    current_page: '',
    pagination: 100,
}

const Context = createContext()

const rootReducer = (state, action) => {
    switch (action.type) {

        /*      Auth    */
        case "LOGIN":
            return { ...state, user: action.payload }

        case "LOGOUT":
            return { ...state, user: null }

        case "CONFIRMED_DIASPORA":
            return { ...state, confirmed_diaspora: action.payload }

        case "CONFIRMED_DIASPORA_COUNT":
            return { ...state, confirmed_diaspora_count: action.payload }

        case "SET_FEEDS":
            return { ...state, feeds: action.payload }

        case "SET_FEEDS_COUNT":
            return { ...state, feeds_count: action.payload }


        case "SET_MODAL":
            return { ...state, modal_is_open: action.payload }

        case "SET_LOADING":
            return { ...state, loading: action.payload }

        case "SET_MODAL_NAME":
            return { ...state, modal_name: action.payload }

        case "SET_VIEWING_USER":
            return { ...state, viewing_user: action.payload }

        case "SET_PAGE":
            return { ...state, page: action.payload }

        case "SET_PAGINATION":
            return { ...state, pagination: action.payload }

        case "SET_HAS_MORE_DATA":
            return { ...state, has_more_data: action.payload }


        case "SET_CURRENT_PAGE":
            return { ...state, current_page: action.payload }

        default:
            return state;
    }
}


const Provider = ({ children }) => {

    const [state, dispatch] = useReducer(rootReducer, initialState);

    useEffect(() => {
        dispatch({
            type: "LOGIN",
            payload: JSON.parse(window.localStorage.getItem('user'))
        })
    }, []);




    const router = useRouter();

    // axios.interceptors.response.use(
    //     function (response) {
    //         return response;
    //     }, function (error) {
    //         let res = error.response;
    //         if (res.status === 401 && !res.config.__isRetryRequest) {
    //             return new Promise((resolve, reject) => {
    //                 axiso.post('/api/logout', JSON.stringify({})).then(() => {
    //                     console.log('401 error => logout');
    //                     dispatch({ type: "LOGOUT" });
    //                     window.localStorage.removeItem('user');
    //                     router.push('/login')
    //                 }).catch(err => {
    //                     console.log('asios interceptors error');
    //                     reject(err);
    //                 })
    //             })
    //         }

    //         return Promise.reject(error)
    //     }
    // );
    return (
        <Context.Provider value={{ state, dispatch }}
        >
            {children}
        </Context.Provider>
    )
}

export { Context, Provider }