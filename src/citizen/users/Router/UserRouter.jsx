import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { HistoryComplaint, HomeComplaint, HomeCritics, HomeEmergency, HomeInfo, HomeUsers, NavUser, PerfilUsuario } from '../';
import { useAdPlace } from '../../../hooks';

export const UserRouter = () => {

    const { startLoadingPlace } = useAdPlace();

    useEffect(() => {
        startLoadingPlace();
    }, [])


    return (
        <>
            <NavUser />
            <Routes>
                <Route path='home' element={<HomeUsers />} />
                <Route path='/perfil' element={<PerfilUsuario />} />
                <Route path='emergency' element={<HomeEmergency />} />
                <Route path='complaint' element={<HomeComplaint />} />
                <Route path='complaint/history' element={<HistoryComplaint />} />
                <Route path='infos' element={<HomeInfo />} />
                <Route path='critics' element={<HomeCritics />} />
                <Route path='/*' element={<Navigate to='home' />} />
            </Routes>
        </>
    )
}
