import React from 'react'
import { useAuth } from "./store/auth";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const logout = () => {

    const { LogoutUser } = useAuth();

    useEffect(() => {
        LogoutUser();
    }, [LogoutUser]);
    location.reload();
    return <Navigate to="/login" />;

}

export default logout
