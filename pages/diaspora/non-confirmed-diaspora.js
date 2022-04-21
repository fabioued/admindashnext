import { useRouter } from "next/router"
import React, { useContext } from 'react';
import ProtectedRoute from "../../components/routes/protectedRoute"
import Link from "next/link"
import InnerMenu from "../../components/Navigation/InnerMenu";
const nonConfirmedDiaspora = () => {
    const links = [{
        name: 'Non Confirmed Diaspora',
        link: "/diaspora/non-confirmed-diaspora"
    }, {
        name: 'Confirmed Diaspora',
        link: "/diaspora/confirmed-diaspora"
    }]
    return (
        <>
            <InnerMenu links={links} />
        </>
    );
};

export default nonConfirmedDiaspora;