import InnerMenu from "../../../components/Navigation/InnerMenu";
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../../../context/index"
import BreadCrumb from "../../../components/Navigation/Breadcrumb"
import BreadcrumbButton from "../../../components/Navigation/BreadcrumbButton";
import Links from "../../../lib/innerMenu"
import landingPageService from "../../../services/landing-page/landingPageService";
import { toast } from "react-toastify"
import moment from 'moment';
import { Avatar, Tag, Modal } from 'antd'
import { CloseCircleFilled } from '@ant-design/icons';

const Contacts = () => {

    const { state, dispatch } = useContext(Context);
    const [modalTitle, setModalTitle] = useState('');
    const {
        loading, modal_name, contacts, contacts_count, current_contact_message, modal_is_open
    } = state;
    const { current_page } = state;

    const formatDate = (date) => {
        moment.locale('en');
        return moment(date).format("LL");
    }

    const fechtAll = async () => {

        const data = await landingPageService.fetchAllContacts();

        dispatch({
            type: "SET_CONTACTS_COUNT",
            payload: data.count
        });
        dispatch({
            type: "SET_CONTACTS",
            payload: data.contacts
        });

        dispatch({
            type: "SET_CURRENT_PAGE",
            payload: 'landing-page-contacts'
        });

    }

    useEffect(() => {
        (async () => {
            dispatch({
                type: "SET_LOADING",
                payload: true
            });
            fechtAll();

            dispatch({
                type: "SET_LOADING",
                payload: false
            });
        })();
    }, []);

    const viewMessage = async (message) => {
        dispatch({
            type: "SET_CURRENT_CONTACT_MESSAGE",
            payload: message
        })

        dispatch({
            type: "SET_MODAL",
            payload: true
        })


        dispatch({
            type: "SET_MODAL_NAME",
            payload: "contactMessage"
        })
    }


    const closeModal = () => {
        dispatch({
            type: "SET_MODAL",
            payload: false
        })
        dispatch({
            type: "SET_MODAL_NAME",
            payload: ""
        })
    }

    const reply = async (contact) => {
        alert('Reply function coming soon !')
    }

    const deleteRecord = async (id) => {

        try {
            dispatch({
                type: "SET_LOADING",
                payload: true
            });
            await landingPageService.deleteContactRecord(id);
            fechtAll();

            dispatch({
                type: "SET_LOADING",
                payload: false
            });

        } catch (err) {
            dispatch({
                type: "SET_LOADING",
                payload: false
            });
            let message = err.message;
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT,
            })

        }
    }

    return (
        <>
            <InnerMenu links={Links.landinLinks} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb-main user-member justify-content-sm-between ">
                            <BreadCrumb title={"Contacts"} count={contacts_count} />
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="userDatatable global-shadow border p-30 bg-white radius-xl w-100 mb-30">
                            <div className="table-responsive">
                                <table className="table mb-0 table-borderless">
                                    <thead>
                                        <tr className="userDatatable-header">

                                            <th>
                                                <span className="userDatatable-title">Name</span>
                                            </th>
                                            <th>
                                                <span className="userDatatable-title">Email</span>
                                            </th>
                                            <th>
                                                <span className="userDatatable-title">Message</span>
                                            </th>
                                            <th>
                                                <span className="userDatatable-title">Language</span>
                                            </th>
                                            <th>
                                                <span className="userDatatable-title">Date</span>
                                            </th>
                                            <th>
                                                <span className="userDatatable-title float-right">action</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contacts && contacts_count > 0 && contacts.map(
                                            function (contact, index) {
                                                return (

                                                    <tr key={index}>
                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {contact.name}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="userDatatable-content">
                                                                {contact.email}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="contact-message">
                                                                {contact.message}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="userDatatable-content">
                                                                <span className="bg-opacity-success  color-success rounded-pill userDatatable-content-status active">{contact.lang === 'en' ? 'English' : 'French'}</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="userDatatable-content d-inline-block">
                                                                {formatDate(contacts?.created_at)}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">

                                                                <li>
                                                                    <a href="#" className="view" onClick={() => viewMessage(contact.message)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                                    </a>
                                                                </li>

                                                                <li>
                                                                    <a href="#" className="edit" onClick={() => reply(contact)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-corner-up-right"><polyline points="15 14 20 9 15 4"></polyline><path d="M4 20v-7a4 4 0 0 1 4-4h12"></path></svg></a>
                                                                </li>

                                                                {/* <li>
                                                                    <a href="#" className="remove" onClick={() => deleteRecord(contact.id)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1={10} y1={11} x2={10} y2={17} /><line x1={14} y1={11} x2={14} y2={17} /></svg></a>
                                                                </li> */}
                                                            </ul>
                                                        </td>
                                                    </tr>


                                                );
                                            }
                                        )}

                                        {contacts && contacts_count < 1 && (
                                            <tr>
                                                <td colSpan="7" className="text-center">
                                                    No Contact Messages
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal
                    className="diasporaModal"
                    destroyOnClose={true}
                    centered={true}
                    visible={modal_is_open && modal_name === "contactMessage"}
                    title={modalTitle}
                    closeIcon={<CloseCircleFilled style={{ fontSize: '150%' }} />}
                    onOk={closeModal}
                    onCancel={closeModal}
                    width={1000}
                    bodyStyle={{ overflowX: 'scroll' }}
                    zIndex={9000}
                    footer={null}

                >

                    <div className="card-body">
                        <div className="container justify-content-center">
                            <div className="row ">
                                <div className="col-md-12 pb-md-30">
                                    <div className="contact-message alert-icon-area alert alert-dark" role="alert">
                                        <div className="alert-content">
                                            <p>{current_contact_message}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 pt-md-30">
                                    <button type="button" className="btn btn-cancel" onClick={closeModal}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>

            </div>



        </>
    );
};

export default Contacts;