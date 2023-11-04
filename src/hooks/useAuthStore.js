import { useDispatch, useSelector } from 'react-redux';
import { citizenApi } from '../api';
import { clearErrorMessage, onCheckingAuht, onLoadGency, onLoadInfo, onLoadPlaces, onLoadSerenes, onLoadUsers, onLogin, onLogout, onLogoutAlert, onLogoutGency, onLogoutInfo, onLogoutPlace, onLogoutSerene, onLogoutUi, onLogoutUser } from '../store';
import { useUi } from './useUi';
import { errorAlert } from '../helpers';

export const useAuthStore = () => {

    const { status, user, errorMessage, loadindAuth } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { authState } = useUi();

    const startLogin = async ({ email, password }) => {
        dispatch(onCheckingAuht(true));
        try {
            const { data } = await citizenApi.post(`/no-roguin-to-toroku/roguin/${authState}`, { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid, celular: data.celular, rol: data.rol, logged: true }));
        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
                dispatch(onCheckingAuht(false))
                errorAlert('Credenciales incorrectas')
            }, 10);
        }
    }

    const startSignup = async (model) => {
        try {
            dispatch(onCheckingAuht(true));
            await citizenApi.post('/no-roguin-to-toroku/atarashi/citizen', model);
            dispatch(onLogout())
            return true;
        } catch (error) {
            if (error.response.data) {
                const { er, erros } = error.response.data
                if (er) {
                    const { dni } = erros;
                    if (dni) {
                        const { msg } = dni;
                        console.log(msg)
                    }
                } else {
                    const { cel, dn, email, msg } = erros;
                    errorAlert(`Error al registra: ${(email != '') ? email : ''} ${(cel != '') ? cel : ''} ${(msg != '') ? msg : ''} ${(dn != '') ? dn : ''}`);
                }
            }
            setTimeout(() => {
                dispatch(onCheckingAuht(false));
                dispatch(clearErrorMessage());
            }, 10);
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
        dispatch(onLogoutGency());
        dispatch(onLogoutInfo());
        dispatch(onLogoutPlace());
        dispatch(onLogoutSerene());
        dispatch(onLogoutUser());
        dispatch(onLogoutUi());
        dispatch(onLogoutAlert());
        setTimeout(() => {
            dispatch(onLogout());
        }, 10);
    }

    return {
        errorMessage,
        status,
        user,
        authState,
        loadindAuth,
        checkAuthToken,
        startLogin,
        startLogout,
        startSignup,
    }
}