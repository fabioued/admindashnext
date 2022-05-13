import InnerMenu from "../../components/Navigation/InnerMenu";
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../context/index";
import Links from "../../lib/innerMenu";
import AdminMember from "../../components/users/MemberCard";
import BreadCrumb from "../../components/Navigation/Breadcrumb";
import BreadcrumbButton from "../../components/Navigation/BreadcrumbButton";
import usersServices from "../../services/users/usersServices"
import { toast } from "react-toastify"
import { Modal, Alert, Button, Tag, Space, Select, Form, Input } from 'antd';
import { SyncOutlined, CloseCircleFilled } from '@ant-design/icons';
import PageLoader from '../../components/loaders/PageLoader'

const Users = () => {

    const { state, dispatch } = useContext(Context);
    const { current_page, admin_users, admin_users_count, loading, cookie, modal_is_open, modal_name
    } = state;
    const [modalTitle, setModalTitle] = useState('');
    const [buttonLoading, setButtonLoading] = useState(false);

    useEffect(() => {
        (async () => {
            dispatch({
                type: "SET_CURRENT_PAGE",
                payload: 'users'
            });

            dispatch({
                type: "SET_LOADING",
                payload: true
            });

            const data = await usersServices.fetchUsers();

            dispatch({
                type: "SET_ADMIN_USERS",
                payload: data
            });

            dispatch({
                type: "SET_ADMIN_USERS_COUNT",
                payload: data.length
            });

            dispatch({
                type: "SET_LOADING",
                payload: false
            });

        })();
    }, []);


    const [form] = Form.useForm();

    const { Option } = Select;

    const onFinish = async (values) => {
        try {
            setButtonLoading(true);
            await usersServices.createUser(values);
            dispatch({
                type: "SET_MODAL",
                payload: false
            });

            dispatch({
                type: "SET_MODAL_NAME",
                payload: ""
            });

            setButtonLoading(false);
            toast.success('The user has been created successfully !!!', {
                position: toast.POSITION.TOP_RIGHT
            })

            dispatch({
                type: "SET_LOADING",
                payload: true
            });

            const data = await usersServices.fetchUsers();

            dispatch({
                type: "SET_ADMIN_USERS",
                payload: data
            });

            dispatch({
                type: "SET_ADMIN_USERS_COUNT",
                payload: data.length
            });

            dispatch({
                type: "SET_LOADING",
                payload: false
            });

            form.resetFields();

        } catch (err) {
            setButtonLoading(false);
            let message = err.message;
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT,
            })

        }
    };

    const onFinishFailed = (errorInfo) => {
        //console.log('Failed:', errorInfo);
    };

    const showModal = async () => {
        setModalTitle('Create User');
        dispatch({
            type: "SET_MODAL",
            payload: true
        })
        dispatch({
            type: "SET_MODAL_NAME",
            payload: "CreateFeed"
        })
    }


    const closeModal = () => {
        form.resetFields();
        setButtonLoading(false);
        dispatch({
            type: "SET_MODAL",
            payload: false
        })
        dispatch({
            type: "SET_MODAL_NAME",
            payload: ""
        })
    }



    return (
        <>
            {/* <InnerMenu links={Links.usersLinks} /> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb-main user-member justify-content-sm-between">
                            <BreadCrumb title={"Manage Admin Users"} count={admin_users_count} />
                            <div className="action-btn">
                                <button onClick={showModal} type="button" className="btn px-15 btn-success">
                                    <i className="las la-plus fs-16"></i>Add New Member
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {loading && (<PageLoader />)}
                {!loading && (
                    <div className="row">
                        {admin_users && admin_users.length > 0 && (admin_users.map((user, index) => {
                            return <AdminMember key={index} user={user
                            } />
                        }))}
                    </div>
                )}

                <Modal
                    className="diasporaModal"
                    visible={modal_is_open && modal_name === "CreateFeed"}
                    title={modalTitle}
                    destroyOnClose={true}
                    centered={true}
                    closeIcon={<CloseCircleFilled style={{ fontSize: '150%' }} />}
                    width={680}
                    zIndex={7000}
                    onCancel={closeModal}
                    footer={null}>
                    <div className="card-body">
                        <div className="container justify-content-center">
                            <Form
                                form={form}
                                name="createUser"
                                colon={false}
                                labelCol={{
                                    span: 5,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >

                                <Form.Item
                                    label="Name"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please add a name!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please add E-mail!',
                                        },
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                                    name="rights"
                                    label="Position"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select admin level!',
                                        },
                                    ]}
                                >
                                    <Select style={{ zIndex: 8000 }} getPopupContainer={node => node.parentNode}>
                                        <Option value="viewer">Viewer</Option>
                                        <Option value="admin">Admin</Option>
                                        <Option value="superadmin">Super Admin</Option>
                                    </Select>
                                </Form.Item>

                                <div className="row offset-sm-1">
                                    <div className="col-md-6 pt-md-30">
                                        <button type="submit" className="btn btn-add" disabled={buttonLoading}>
                                            {buttonLoading && <SyncOutlined spin />}
                                            Submit
                                        </button>
                                    </div>
                                    <div className="col-md-6 pt-md-30">

                                        <button type="button" className="btn btn-cancel" onClick={closeModal}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Modal>
            </div>

        </>
    );
};

export default Users;