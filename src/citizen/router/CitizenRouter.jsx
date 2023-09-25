import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '../../hooks';
import { AdminRouter, SereneRouter, UserRouter } from '..';

export const CitizenRouter = () => {

    const { user } = useAuthStore();

    return (
        <Routes>
            {
                (user.rol === 'admin')
                    ? (
                        <>
                            <Route path="/*" element={<AdminRouter />} />
                            <Route path="/*" element={<Navigate to="/" />} />
                        </>
                    )
                    : (
                        <>
                            {
                                (user.rol === 'ciuda')
                                    ? (
                                        <>
                                            <Route path="/*" element={<UserRouter />} />
                                            <Route path="/*" element={<Navigate to="/" />} />
                                        </>
                                    )
                                    : (
                                        <>
                                            <Route path="/*" element={<SereneRouter />} />
                                            <Route path="/*" element={<Navigate to="/" />} />
                                        </>
                                    )
                            }
                        </>
                    )
            }
        </Routes>
    )
}
