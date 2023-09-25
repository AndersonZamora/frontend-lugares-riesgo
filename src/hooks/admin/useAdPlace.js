import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { citizenApi } from '../../api';
import { errorAlert, progressBar, successAlert } from '../../helpers';
import { onAddNewPlace, onDeletePlaces, onIsLoagingPlace, onLoadPlaces, onUpdatePlace, onViewPlace } from '../../store';

export const useAdPlace = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { places, isLoadingPlaces, placeActive } = useSelector(state => state.auplace);

    const startLoadingPlace = async () => {
        try {
            dispatch(onIsLoagingPlace(true));
            const { data } = await citizenApi.get('/basho');
            dispatch(onLoadPlaces(data.lugares))
            setTimeout(() => {
                dispatch(onIsLoagingPlace(false));
            }, 10);
        } catch (error) {
            dispatch(onIsLoagingPlace(false));
        }
    }

    const starNewPlace = async (model) => {
        try {
            progressBar('Registrando...');
            const { data } = await citizenApi.post('/basho', model);
            dispatch(onAddNewPlace({ Id: data.uid, ...model }));
            successAlert('Resgistrado');
            Swal.close();
            navigate('/place');
        } catch (error) {
            Swal.close();
            errorAlert('Error al registrar');
        }
    }

    const starUpdatePlace = async (model) => {
        try {
            progressBar('Actualizando...');
            await citizenApi.put(`/basho/${model.Id}`, model);
            dispatch(onUpdatePlace(model));
            successAlert('Resgistrado');
            Swal.close();
            navigate('/place');
        } catch (error) {
            Swal.close();
            errorAlert('Error al registrar');
        }
    }

    const startActivePlace = (model) => {
        dispatch(onViewPlace({ ...model, state: true }));
    }

    const startDeletePlace = async (Id = gencyActive.Id) => {
        try {
            progressBar('Eliminando...');
            await citizenApi.delete(`/basho/${Id}`);
            dispatch(onDeletePlaces(Id));
            Swal.close();
            successAlert('Eliminado');
            navigate('/place');
        } catch (error) {
            Swal.close();
            errorAlert('Error al eliminar');
        }
    }

    const startCancel = (id) => {
        navigate('/place');
    }

    return {
        places,
        placeActive,
        isLoadingPlaces,
        starNewPlace,
        startLoadingPlace,
        startActivePlace,
        startCancel,
        startDeletePlace,
        starUpdatePlace,
    }
}
