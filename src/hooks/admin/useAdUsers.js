import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { citizenApi } from '../../api';
import { errorAlert, progressBar, successAlert } from '../../helpers';
import { onDeleteUsers, onIsLoagingUser, onLoadUsers, onViewUser } from '../../store';

export const useAdUsers = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { users, isLoadingUsers, userActive } = useSelector(state => state.ausers);

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

    const startActiveUser = (model) => {
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

    return {
        //* Propiedades
        users,
        isLoadingUsers,
        userActive,
        //* Metodos
        startLoadingCitizen,
        startDeleteUser,
        startActiveUser,
        startCancel,
    }
}