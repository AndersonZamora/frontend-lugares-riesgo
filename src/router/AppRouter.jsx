import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LocPage, LoginPage, SignupPage } from '../auth';
import { CitizenRouter } from '../citizen';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {

    const { checkAuthToken, status } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);

    if (status === 'checking') {
        return (
            <h1>Cargando...</h1>
        )
    }


    return (
        <Routes>
            {
                (status === 'not-authenticated')
                    ? (
                        <>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/new_loc" element={<LocPage />} />
                            <Route path="/*" element={<Navigate to="/new_loc" />} />
                        </>
                    ) : (
                        <>
                            <Route path="/*" element={<CitizenRouter />} />
                            <Route path="/*" element={<Navigate to="/" />} />
                        </>
                    )
            }
        </Routes>
    )
}
