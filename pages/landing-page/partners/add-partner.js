import InnerMenu from "../../../components/Navigation/InnerMenu";
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../../context/index";
import Links from "../../../lib/innerMenu"
import BreadCrumb from "../../../components/Navigation/Breadcrumb"
import {
    Form,
    Input,
    Select,
    Upload,
    Button
} from 'antd';

const AddPartner = () => {

    const { state, dispatch } = useContext(Context);
    const { current_page } = state;
    const { Option } = Select;

    useEffect(() => {
        (async () => {
            dispatch({
                type: "SET_CURRENT_PAGE",
                payload: 'landing-page'
            });
        })();
    }, []);



    return (
        <>
            <InnerMenu links={Links.landinLinks} />
            <div className="container-fluid">
                <div className="col-lg-12">
                    <div className="card card-Vertical card-default card-md my-4">
                        <div className="card-header">
                            <BreadCrumb title={"Add New Partner"} />
                        </div>
                        <div className="card-body ">
                            <Form >
                                <div className="row">
                                    <div className="col-md-12">
                                        <Form.Item label="Image" required
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}>
                                            <Form.Item
                                                name="image"
                                                valuePropName="fileList" noStyle
                                            >
                                                <Upload.Dragger name="files">
                                                    <p className="ant-upload-drag-icon">

                                                    </p>
                                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                                                </Upload.Dragger>
                                            </Form.Item>
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="row">
                                    <div class="col-lg-12">
                                        <Form.Item
                                            label="Name"
                                            validateStatus=""
                                            help=""
                                            required
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Input placeholder="" />
                                        </Form.Item>
                                    </div>
                                </div>

                                <Form.Item
                                    wrapperCol={{
                                        offset: 6,
                                    }}
                                >
                                    <Button type="primary" className="btn btn-success block" size={"large"}>
                                        Create
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default AddPartner;