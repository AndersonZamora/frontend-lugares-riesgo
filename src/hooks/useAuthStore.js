import { useDispatch, useSelector } from 'react-redux';
import { citizenApi } from '../api';
import { clearErrorMessage, onChecking, onLoadGency, onLoadInfo, onLoadPlaces, onLoadSerenes, onLoadUsers, onLogin, onLogout, onLogoutUi } from '../store';
import { useUi } from './useUi';

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { authState } = useUi();

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await citizenApi.post(`/no-roguin-to-toroku/roguin/${authState}`, { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid, celular: data.celular, rol: data.rol, logged: true }));
        } catch (error) {
            console.log(error)
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startSignup = async (model) => {
        dispatch(onChecking());
        try {
            await citizenApi.post('/no-roguin-to-toroku/atarashi/citizen', model);
            dispatch(onLogout())
            return true;
        } catch (error) {
            console.log(error)
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
            return false;
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());
        try {
            const { data } = await citizenApi.post(`/no-roguin-to-toroku/renew?token=${token}`);
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ ...user, name: data.name, uid: data.uid, rol: data.role, logged: true }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
        dispatch(onLoadUsers());
        dispatch(onLogoutUi());
        dispatch(onLoadSerenes())
        dispatch(onLoadGency())
        dispatch(onLoadInfo())
        dispatch(onLoadPlaces())
        dispatch(onLoadSerenes())
    }

    return {
        //* Propiedades
        errorMessage,
        status,
        user,
        authState,
        //* Métodos
        checkAuthToken,
        startLogin,
        startLogout,
        startSignup,
    }
}