import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { citizenApi } from '../../api';
import { errorAlert, progressBar, successAlert } from '../../helpers';
import { onAddNewGency, onDeleteGency, onIsLoagingGency, onLoadGency, onViewGency } from '../../store';

export const useAdGency = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { gencys, isLoadingGency, gencyActive } = useSelector(state => state.augency);

    const startLoadingGency = async () => {
        try {
            dispatch(onIsLoagingGency(true));
            const { data } = await citizenApi.get('/otoko');
            dispatch(onLoadGency(data.tipos))
            setTimeout(() => {
                dispatch(onIsLoagingGency(false));
            }, 10);
        } catch (error) {
            dispatch(onIsLoagingGency(false));
        }
    }

    const starNewGency = async (model) => {
        try {
            progressBar('Registrando...');
            const { data } = await citizenApi.post('/otoko', model);
            console.log(data);
            dispatch(onAddNewGency({ ...data.succ }));
            successAlert('Resgistrado');
            Swal.close();
            navigate('/emergency');
        } catch (error) {
            if (error.response) {
                const { data } = error.response;
                errorAlert(
                    `Error al registra: ${data.vtipo} ${data.vnumero}`
                );
            } else {
                Swal.close();
                errorAlert('Error al registrar');
            }
        }
    }

    const startActiveGency = (model) => {
        dispatch(onViewGency({ ...model, state: true }));
    }

    const startDeleteGency = async (Id = gencyActive.Id) => {
        try {
            progressBar('Eliminando...');
            await citizenApi.delete(`/otoko/${Id}`);
            dispatch(onDeleteGency(Id));
            Swal.close();
            successAlert('Eliminado');
            navigate('/emergency');
        } catch (error) {
            Swal.close();
            errorAlert('Error al eliminar');
        }
    }

    const startCancel = (id) => {
        navigate('/emergency');
    }

    return {
        gencys,
        gencyActive,
        isLoadingGency,
        starNewGency,
        startLoadingGency,
        startActiveGency,
        startCancel,
        startDeleteGency,
    }
}
