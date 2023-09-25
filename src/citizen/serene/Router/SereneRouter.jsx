import { Navigate, Route, Routes } from 'react-router-dom';
import { HomeSerene, NavSerene, PerfilSerene } from '../';

export const SereneRouter = () => {
    return (
        <>
            <NavSerene />
            <Routes>
                <Route path='home' element={<HomeSerene />} />
                <Route path='perfil' element={<PerfilSerene />} />
                <Route path='/*' element={<Navigate to='home' />} />
            </Routes>
        </>
    )
}
