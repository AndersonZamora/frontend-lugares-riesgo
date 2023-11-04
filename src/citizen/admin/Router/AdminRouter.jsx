import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { DetailEmergency, DetailInfo, DetailPlace, DetailSerene, DetailUser, HomeAdmin, HomeEmergency, HomeInfo, HomePlace, HomeSerene, HomeUser, NavAdmin, NewEmergency, NewInfo, NewPlace, NewSerene, PerfilAdmin } from '../';
import { useUi } from '../../../hooks';

export const AdminRouter = () => {

    const { startViewInfo } = useUi();

    useEffect(() => {
        startViewInfo(false);
    }, [])

    return (
        <>
            <NavAdmin />
            <Routes>
                <Route path='/home' element={<HomeAdmin />} />
                <Route path='/perfil' element={<PerfilAdmin />} />

                <Route path='/users' element={<HomeUser />} />
                <Route path='/users/detail' element={<DetailUser />} />

                <Route path='/serene' element={<HomeSerene />} />
                <Route path='/serene/new' element={<NewSerene />} />
                <Route path='/serene/detail' element={<DetailSerene />} />

                <Route path='/emergency' element={<HomeEmergency />} />
                <Route path='/emergency/new' element={<NewEmergency />} />
                <Route path='/emergency/detail' element={<DetailEmergency />} />

                <Route path='/place' element={<HomePlace />} />
                <Route path='/place/new' element={<NewPlace />} />
                <Route path='/place/detail' element={<DetailPlace />} />

                <Route path='/info' element={<HomeInfo />} />
                <Route path='/info/new' element={<NewInfo />} />
                <Route path='/info/detail' element={<DetailInfo />} />

                <Route path='/*' element={<Navigate to='/home' />} />
            </Routes>
        </>
    )
}
