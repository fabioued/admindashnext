import { useReducer, createContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";


const initialState = {
    user: null,
    cookie: null,
    diaspora: [],
    startups: [],
    feeds: [],
    admin_users: [],
    diaspora_count: 0,
    startups_count: 0,
    feeds_count: 0,
    current_feed: {},
    admin_users_count: 0,
    open: false,
    modal_is_open: false,
    has_more_data: false,
    total_count: 0,
    loading: true,
    modal_name: '',
    modal_title: '',
    viewing_user: {},
    viewing_startup: {},
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


        case "SET_COOKIE":
            return { ...state, cookie: action.payload }

        case "SET_TOTAL_COUNT":
            return { ...state, total_count: action.payload }

        case "SET_DIASPORA":
            return { ...state, diaspora: action.payload }

        case "SET_DIASPORA_COUNT":
            return { ...state, diaspora_count: action.payload }


        case "SET_STARTUPS":
            return { ...state, startups: action.payload }

        case "SET_STARTUPS_COUNT":
            return { ...state, startups_count: action.payload }

        case "SET_FEEDS":
            return { ...state, feeds: action.payload }

        case "SET_CURRENT_FEED":
            return { ...state, current_feed: action.payload }

        case "SET_FEEDS_COUNT":
            return { ...state, feeds_count: action.payload }


        case "SET_ADMIN_USERS":
            return { ...state, admin_users: action.payload }

        case "SET_ADMIN_USERS_COUNT":
            return { ...state, admin_users_count: action.payload }

        case "SET_MODAL":
            return { ...state, modal_is_open: action.payload }

        case "SET_LOADING":
            return { ...state, loading: action.payload }

        case "SET_MODAL_NAME":
            return { ...state, modal_name: action.payload }

        case "SET_MODAL_TITLE":
            return { ...state, modal_title: action.payload }

        case "SET_VIEWING_USER":
            return { ...state, viewing_user: action.payload }

        case "SET_VIEWING_STARTUP":
            return { ...state, viewing_startup: action.payload }



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