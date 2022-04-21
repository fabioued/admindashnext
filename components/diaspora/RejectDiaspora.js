import { useContext, useState } from "react";
import { Modal, Alert } from 'antd';
import { Context } from "../../context/index"
import { toast } from "react-toastify"
import { SyncOutlined } from '@ant-design/icons';

const RejectDiaspora = (diaspora) => {
    const { state, dispatch } = useContext(Context);
    const [reason, setReason] = useState("");
    const [email, setEmail] = useState("");
    const { viewing_user } = state;
    const [loading, setLoading] = useState(false);

    email = viewing_user.users_email;
    reason = "The personal profile submitted doesn't meet our sign-up requirements.&#13;&#10;&#13;&#10;To gain approval, please complete one or all of the following missing information &#13;&#10;&#13;&#10;Personal picture&#13;&#10;Detailed biography&#13;&#10;&#13;&#10;After completion, notify us for re - evaluation by replying this mail.";

    let message;
    let lang = viewing_user.profile_preferedLanguage;
    if (lang === "fr") message = "The user language is French. Make sure to send your message in French. Thanks !!";
    else if (lang === "en") message = "The user language is English. Make sure to send your message in English. Thanks !!";


    const handleSubmit = async (e) => {
        e.preventDefault();
        alert('handleSubmit')
        try {
            setLoading(true)

            // dispatch({
            //     type: "LOGIN",
            //     payload: login.data
            // })
            setLoading(false)


        } catch (err) {
            setLoading(false)
            let message;
            console.log({ err });
            toast.error(message, {
                position: toast.POSITION.TOP_CENTER
            })

        }
    }


    return (
        <>
            <div className="col-md-12">
                <div className="alert-icon-area alert alert-warning " role="alert">
                    <div className="alert-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                    </div>
                    <div className="alert-content">
                        <p>{message}</p>
                    </div>
                </div>
            </div>
            <div className="card-body pb-md-30" data-select2-id="28">
                <form onSubmit={handleSubmit} className="myform form-outline">
                    <div className="form-group">
                        <label for="a10" className="il-gray fs-14 fw-500 align-center required">Email Address</label>
                        <input type="text" className="form-control ih-medium ip-light radius-xs b-light px-15"
                            id="a10" placeholder="username@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group form-element-textarea mb-20">
                        <label for="exampleFormControlTextarea1" className="il-gray fs-14 fw-500 align-center required">Reason</label>
                        <textarea rows={9} onChange={(e) => setReason(e.target.value)} className="form-control reason" id="exampleFormControlTextarea1">
                            {reason}
                        </textarea>
                    </div>

                    <div className="col text-center">
                        <button className="btn btn-submit" type="submit" disabled={!email || loading}>
                            {loading ? (<span><SyncOutlined spin ></SyncOutlined> Loading ...</span>) : 'Send'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RejectDiaspora;
