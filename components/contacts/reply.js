import React, { useContext, useEffect, useState } from 'react';
import Link from "next/link"
import { Context } from "../../context/index"
import { getName as getCountryName } from "country-list";
import Moment from "react-moment";

const Reply = () => {
    const { state, dispatch } = useContext(Context);
    const {
        loading, current_contact
    } = state;
    return (
        <>
            <div className="col-lg-12">
                <div className="bg-white mb-25 rounded-xl">
                    <div className="atbd-mailCompose ">
                        <form className="createForm">
                            <div className="atbd-mailCompose__header d-flex justify-content-between align-items-center">
                                <h6 className="mailCompose-title">Replying to {current_contact.name}</h6>
                            </div>
                            <div className="atbd-mailCompose__body">
                                <div className="mailCompose-form-content">
                                    <div className="form-group positon-relative">
                                        <label class="color-dark mt-3 align-center">To *</label>
                                        <input type="text" className="form-control-lg px-2" name="mail-to" value={current_contact.email} />
                                    </div>
                                    <div className="form-group positon-relative">
                                        <label for="formGroupExampleInputs" class="color-dark align-center mt-3">Subject *</label>
                                        <input type="text" className="form-control-lg px-2" name="mail-to" placeholder="Enter Subject" />
                                    </div>
                                    <div className="form-group positon-relative">
                                        <label for="formGroupExampleInputs" class="color-dark mt-3 align-center">Message *</label>
                                        <textarea className="form-control " id="exampleFormControlTextarea1" rows={10} />
                                    </div>
                                </div>
                            </div>
                            <div className="atbd-mailCompose__footer d-flex justify-content-between align-items-center">
                                <div className="footer-left d-flex align-items-center">
                                    <button className="btn btn-md btn-success">Send</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Reply;
