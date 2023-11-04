import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { citizenApi } from '../../api';
import { errorAlert, progressBar, successAlert } from '../../helpers';
import { onAddNewInfo, onDeleteInfos, onIsLoagingInfo, onLoadInfo, onUpdateInfo, onViewInfo } from '../../store';

export const useAdInfo = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { infos, isLoadingInfo, infoActive } = useSelector(state => state.auinfo);

    const { viewInfo } = useSelector(state => state.ui);

    const startLoadingInfo = async () => {
        try {
            dispatch(onIsLoagingInfo(true));
            const { data } = await citizenApi.get('/joho');
            dispatch(onLoadInfo(data.infomacion))
            setTimeout(() => {
                dispatch(onIsLoagingInfo(false));
            }, 10);
        } catch (error) {
            dispatch(onIsLoagingInfo(false));
        }
    }

    const starNewInfo = async (model) => {
        try {
            progressBar('Registrando...');
            const { data } = await citizenApi.post('/joho', model);
            dispatch(onAddNewInfo({ Id: data.uid, ...model }));
            successAlert('Resgistrado');
            Swal.close();
            navigate('/info');
        } catch (error) {
            Swal.close();
            errorAlert('Error al registrar');
        }
    }

    const starUpdateInfo = async (model) => {
        try {
            progressBar('Actualizando...');
            await citizenApi.put(`/joho/${model.Id}`, model);
            dispatch(onUpdateInfo(model));
            successAlert('Resgistrado');
            Swal.close();
            navigate('/info');
        } catch (error) {
            Swal.close();
            errorAlert('Error al registrar');
        }
    }

    const startActiveInfo = (model) => {
        dispatch(onViewInfo({ ...model, state: true }));
    }

    const startDeleteInfo = async (Id = gencyActive.Id) => {
        try {
            progressBar('Eliminando...');
            await citizenApi.delete(`/joho/${Id}`);
            dispatch(onDeleteInfos(Id));
            Swal.close();
            successAlert('Eliminado');
            navigate('/info');
        } catch (error) {
            Swal.close();
            errorAlert('Error al eliminar');
        }
    }

    const startCancel = (id) => {
        navigate('/info');
    }

    return {
        infos,
        isLoadingInfo,
        infoActive,
        viewInfo,
        starNewInfo,
        startLoadingInfo,
        startActiveInfo,
        startCancel,
        startDeleteInfo,
        starUpdateInfo,
    }
}
