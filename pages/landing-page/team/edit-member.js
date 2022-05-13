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

const AddMember = () => {

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
                    <div className="card card-Vertical card-default card-md mb-4">
                        <div className="card-header">
                            <BreadCrumb title={"Add New Member"} />
                        </div>
                        <div className="card-body py-md-30">
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
                                <div className="row">
                                    <div class="col-lg-6">
                                        <Form.Item
                                            label="Email"
                                            required
                                            validateStatus=""
                                            help=""
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your E-mail!',
                                                },
                                                {
                                                    type: 'email',
                                                    message: 'The input is not valid E-mail!',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="" />
                                        </Form.Item>
                                    </div>
                                    <div class="col-lg-6">
                                        <Form.Item
                                            label="Linkedin Link"
                                            required
                                            validateStatus=""
                                            help=""
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                                {
                                                    type: 'url',
                                                    warningOnly: true,
                                                },
                                                {
                                                    type: 'string',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="row">
                                    <div class="col-lg-6">
                                        <Form.Item
                                            label="Position"
                                            required
                                            validateStatus=""
                                            help=""
                                            rules={[
                                                {
                                                    required: true,
                                                },

                                            ]}
                                        >
                                            <Input placeholder="" />
                                        </Form.Item>
                                    </div>
                                    <div class="col-lg-6">
                                        <Form.Item
                                            name="language"
                                            label="Language"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please select language!',
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Select Language">
                                                <Option value="en">English</Option>
                                                <Option value="fr">French</Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </div>

                                <Form.Item
                                    wrapperCol={{
                                        span: 24,
                                        offset: 6,
                                    }}
                                >
                                    <Button type="primary" className="block">
                                        Submit
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

export default AddMember;