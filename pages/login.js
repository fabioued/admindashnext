import React, { useState, useContext, useEffect } from 'react';
import Link from "next/link"
import axios from "axios"
import { toast } from "react-toastify"
import { SyncOutlined } from '@ant-design/icons';
import { Context } from "../context/index"
import { useRouter } from "next/router"

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { state, dispatch } = useContext(Context);
    const { user } = state;
    const router = useRouter();
    useEffect(() => {
        if (user != null) {
            router.push('/dashboard')
        }
    }, [user])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const payload = {
                email,
                password,
            };
            const login = await axios.post(`${process.env.NEXT_PUBLIC_API}users/login`, payload);
            let cookieData = JSON.stringify(login.data);

            dispatch({
                type: "SET_COOKIE",
                payload: cookieData
            })
            fetch("/api/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cookieData
                }),
            });
            dispatch({
                type: "LOGIN",
                payload: login.data
            })
            window.localStorage.setItem('user', JSON.stringify(login.data));
            setLoading(false)
            router.push('/dashboard')


        } catch (err) {
            setLoading(false)
            let message;
            if (err.response) {
                if (err.response.data.statusCode === 401) {
                    message = <div>Email / Password is not valid.<br /> Try again!</div>;
                } else if (err.response.data.statusCode === 500) {
                    message = <div>Something went wrong.<br />Try Later !</div>;
                }
            } else {
                message = err.message;
            }

            console.log({ err });
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            })

        }
    }

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-xl-8 col-lg-7 col-md-7 col-sm-8">
                    <div className="signUp-admin-right signIn-admin-right  p-md-40 p-10">
                        <div className="row justify-content-center">
                            <div className="col-xl-10 col-lg-10 col-md-12">
                                <div className="edit-profile mt-md-25 mt-0">
                                    <div className="card border-0">
                                        <div className="card-header border-0  pb-md-15 pb-10 pt-md-20 pt-10 center ">
                                            <div className="edit-profile__title">
                                                <h6 className="content-center ">Bantaba Admin  <span className="text-success"> Dashboard</span></h6>
                                            </div>
                                        </div>
                                        {/* {hasError &&
                                            <div className="p-20">
                                                <Alert type="error"
                                                    message=""
                                                    description={message}
                                                    closable={true}
                                                    closeText={<XCircle />}
                                                />
                                            </div>} */}

                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <img className="bantaba-logo" src="http://" />
                                                </div>
                                                <div className="col-md-12">
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="edit-profile__body">
                                                            <div className="form-group mb-20">
                                                                <label htmlFor="username">Email Address</label>
                                                                <input type="email" className="form-control"
                                                                    id="email" placeholder="Email"
                                                                    value={email}
                                                                    onChange={(e) => setEmail(e.target.value)}
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="form-group mb-15">
                                                                <label htmlFor="password-field">password</label>
                                                                <div className="position-relative">

                                                                    <input id="password-field" type={showPassword ? 'text' : 'password'} className="form-control" name="password" placeholder="password"
                                                                        value={password}
                                                                        onChange={(e) => setPassword(e.target.value)}
                                                                        required
                                                                    />
                                                                    <div className={["fa-fw text-light fs-16 field-icon toggle-password2 " + (showPassword ? "fa fa-eye-slash" : "fa fa-eye")]}
                                                                        onClick={() => setShowPassword(!showPassword)} />
                                                                </div>
                                                            </div>
                                                            <div className="signUp-condition signIn-condition">
                                                                <Link href="/forgot">
                                                                    <a>forgot password ?</a>
                                                                </Link>

                                                            </div>
                                                            <div className="button-group d-flex pt-1 justify-content-md-start justify-content-center">
                                                                <button className="btn btn-block btn-success btn-default btn-squared mr-15 text-capitalize lh-normal px-50 py-15 signIn-createBtn"
                                                                    disabled={!email || !password || loading}
                                                                >
                                                                    {loading ? (<SyncOutlined spin > Loading ...</SyncOutlined>) : 'Login'}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export const getServerSideProps = () => {
    return {
        props: {},
    };
};