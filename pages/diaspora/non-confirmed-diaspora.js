import { useRouter } from "next/router"
import React, { useContext } from 'react';
import ProtectedRoute from "../../components/routes/protectedRoute"
import Link from "next/link"
import InnerMenu from "../../components/Navigation/InnerMenu";
import Links from "../../lib/innerMenu";

const nonConfirmedDiaspora = () => {
    return (
        <>
            <InnerMenu links={Links.DiasporaLinks} />
        </>
    );
};

export default nonConfirmedDiaspora;