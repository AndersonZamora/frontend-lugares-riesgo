import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { citizenApi } from '../../api';
import { onAddNewAlert, onDeleteAlert, onIsLoagingAlert, onLoadAlerts, onSetTotal, onUpdateAlert } from '../../store';
import { progressBar } from '../../helpers';


export const useSeAlert = () => {

    const dispatch = useDispatch();

    const { alerts, total, alertActive, tempId } = useSelector(state => state.usalert);

    const starLoadAlertsSerene = async () => {
        try {
            progressBar('Cargando...');
            dispatch(onIsLoagingAlert(true))
            const { data } = await citizenApi.get('/odayakana/risuto');
            dispatch(onLoadAlerts(data.alertas));
            dispatch(onIsLoagingAlert(false));
            dispatch(onSetTotal(data.alertas.length))
            Swal.close();
        } catch (error) {
            Swal.close();
        }
    }

    const starUpdateAlert = async (model) => {
        try {
            progressBar('Cargando...');
            dispatch(onIsLoagingAlert(true))
            if (model.estado === 'atendido') {
                await citizenApi.post('/odayakana/risuto/up', model);
                dispatch(onDeleteAlert(model.id))
            } else {
                await citizenApi.post('/odayakana/risuto/up', model);
                dispatch(onUpdateAlert(model))
            }
            Swal.close();
        } catch (error) {
            Swal.close();
        }
    }

    const starNewSocketSerene = (alerta) => {
        dispatch(onAddNewAlert(alerta));
        Swal.close();
    }

    return {
        total,
        alerts,
        alertActive,
        tempId,
        starLoadAlertsSerene,
        starNewSocketSerene,
        starUpdateAlert,
    }
}