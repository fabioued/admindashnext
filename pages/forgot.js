import React, { useState, useContext, useEffect } from 'react';
import Link from "next/link"
import axios from "axios"
import { toast } from "react-toastify"
import { SyncOutlined } from '@ant-design/icons';
import { Context } from "../context/index"
import { useRouter } from "next/router"

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
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
            };
            const forgot = await axios.post(`${process.env.NEXT_PUBLIC_API}users/logout`, payload);
            console.log({ forgot })
            setLoading(false)
            toast.success('An Email Has been sent to you.', {
                position: toast.POSITION.TOP_CENTER
            })
        } catch (err) {
            setLoading(false)
            let message;
            if (err.response.data.statusCode === 401) {
                message = <div>Email not found.<br /> Try again!</div>;
            } else if (err.response.data.statusCode === 500) {
                message = <div>Something went wrong.<br />Try Later !</div>;
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

                                        <div className="card-body">
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

                                                    <div className="button-group d-flex pt-1 justify-content-md-start justify-content-center">
                                                        <button className="btn btn-block btn-success btn-default btn-squared mr-15 text-capitalize lh-normal px-50 py-15 signIn-createBtn"
                                                            disabled={!email || loading}
                                                        >
                                                            {loading ? (<SyncOutlined spin > Loading ...</SyncOutlined>) : 'Send Email'}
                                                        </button>
                                                    </div>

                                                </div>
                                            </form>
                                            <p className="text-center p-3">
                                                Already registered?
                                                <Link href="/login">
                                                    <a> Login</a>
                                                </Link>

                                            </p>
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

export default ForgotPassword;