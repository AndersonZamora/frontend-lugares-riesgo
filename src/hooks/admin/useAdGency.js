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
            dispatch(onAddNewGency({ Id: data.uid, tipo: data.tipo, numero: model.numero }));
            successAlert('Resgistrado');
            Swal.close();
            navigate('/emergency');
        } catch (error) {
            if (error.response) {
                const { data } = error.response;
                if (data.erros) {
                    const { tip, cel, msg } = data.erros;
                    errorAlert(
                        `Error al registra: ${(tip != '') ? tip : ''} 
                        ${(cel != '') ? cel : ''}
                        ${(msg != '') ? msg : ''}`
                    );
                } else {
                    Swal.close();
                    errorAlert('Error al registrar');
                }
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
