import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { citizenApi } from '../../api';
import { errorAlert, progressBar, successAlert } from '../../helpers';
import { onClearAlert, onDeleteAlert, onDeleteUsers, onIsLoagingUser, onLoadAlerts, onLoadUsers, onViewUser } from '../../store';

export const useAdUsers = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { users, isLoadingUsers, userActive } = useSelector(state => state.ausers);
    const { alerts } = useSelector(state => state.usalert);

    const startLoadingCitizen = async () => {
        try {
            dispatch(onIsLoagingUser(true));
            const { data } = await citizenApi.get('/kanrisha/risuto/citizen');
            dispatch(onLoadUsers(data.usuarios))
            setTimeout(() => {
                dispatch(onIsLoagingUser(false));
            }, 10);
        } catch (error) {
            dispatch(onIsLoagingUser(false));
        }
    }

    const startLoadingCitizenAlerts = async () => {
        try {
            progressBar('Cargando historial...');
            const { data } = await citizenApi.get(`/kanrisha/risuto/alerts/${userActive.Id}`);
            dispatch(onLoadAlerts(data.alertas))
            Swal.close();
        } catch (error) {
            Swal.close();
            errorAlert('Error al registrar');
        }

    }

    const startActiveUser = (model) => {
        dispatch(onClearAlert());
        dispatch(onViewUser({ ...model, state: true }));
    }

    const startCancel = () => {
        navigate('/users');
    }

    const startDeleteUser = async (id = userActive.Id) => {
        try {
            progressBar('Eliminando...');
            await citizenApi.delete(`/kanrisha/risuto/citizen/${id}`);
            dispatch(onDeleteUsers(id));
            Swal.close();
            successAlert('Usuario eliminado');
            navigate('/users');
        } catch (error) {
            Swal.close();
            errorAlert('Error al eliminar');
        }
    }

    const startDeleteUserAlert = async (id = 0) => {
        try {
            progressBar('Eliminando...');
            await citizenApi.delete(`/kanrisha/risuto/alerts/user/${id}`);
            dispatch(onDeleteAlert(id));
            Swal.close();
        } catch (error) {
            Swal.close();
            errorAlert('Error al eliminar');
        }
    }

    return {
        users,
        isLoadingUsers,
        userActive,
        alerts,
        startLoadingCitizen,
        startDeleteUser,
        startActiveUser,
        startCancel,
        startLoadingCitizenAlerts,
        startDeleteUserAlert
    }
}