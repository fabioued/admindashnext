import { useContext, useState } from "react";
import { Modal, Alert } from 'antd';
import { Context } from "../../context/index"
import { toast } from "react-toastify"
import { SyncOutlined, WarningFilled } from '@ant-design/icons';
import diasporaService from "../../services/diaspora/diasporaService";

const DeleteDiaspora = (diasporaUser) => {
    const { state, dispatch } = useContext(Context);
    const [reason, setReason] = useState("");
    const [id, setId] = useState(0);
    const { viewing_user, diaspora, confirmed_diaspora_count } = state;
    const [loading, setLoading] = useState(false);

    id = viewing_user.users_id;
    let message = "Are you sure you want to delete ? You can't undo this action.";

    const deleteDiaspora = async (e) => {
        try {
            setLoading(true)
            await diasporaService.deleteRecord(id);
            let newRecords = diaspora.filter(function (diaspora) {
                return diaspora.users_id != id
            });
            dispatch({
                type: "SET_DIASPORA",
                payload: newRecords
            });
            dispatch({
                type: "SET_DIASPORA_COUNT",
                payload: newRecords.length
            });

            setLoading(false)

            dispatch({
                type: "SET_MODAL",
                payload: true
            });

            dispatch({
                type: "SET_MODAL_NAME",
                payload: ""
            });

        } catch (err) {
            setLoading(false)
            let message = err.message;
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT,
            })

        }
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

    return (
        <>
            <div className="card-body">
                <div className="container justify-content-center">
                    <div className="row ">
                        <div className="col-md-12 pb-md-30">
                            <div className="alert-icon-area alert alert-danger-custom" role="alert">
                                <div className="alert-icon">
                                    <WarningFilled style={{ color: "#F35627" }} />
                                </div>
                                <div className="alert-content">
                                    <p>{message}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 pt-md-30">
                            <button type="button" className="btn btn-cancel" onClick={closeModal}>Cancel</button>
                        </div>
                        <div className="col-md-6 pt-md-30">
                            <button className="btn btn-delete" type="button" disabled={loading} onClick={deleteDiaspora}>
                                {loading ? (<span><SyncOutlined spin ></SyncOutlined> Deleting ...</span>) : 'Delete'}
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
};

export default DeleteDiaspora;
