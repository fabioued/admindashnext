import { useRouter } from "next/router"
import React, { useEffect, useContext } from 'react';
import { SyncOutlined } from '@ant-design/icons';
import { Context } from '../../context'

const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const { state, dispatch } = useContext(Context);
    const { user } = state;

    useEffect(() => {
        if (user == null) {
            router.push('/login')
        }
    }, [user])

    return (
        <>
            {
                !user ?
                    <SyncOutlined spin className="d-flex justify-content-center display-1 text-primary p-5" />
                    : <>{children}</>}
        </>
    );
};

export default ProtectedRoute;