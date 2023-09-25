import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { citizenApi } from '../../api';
import { onAddNewAlert, onIsLoagingAlert, onLoadAlerts, onSetTotal } from '../../store';
import { progressBar } from '../../helpers';


export const useSeAlert = () => {

    const dispatch = useDispatch();

    const { alerts, total } = useSelector(state => state.usalert);

    const starLoadAlertsSerene = async () => {
        try {
            progressBar('Cargando...');
            dispatch(onIsLoagingAlert(true))
            const { data } = await citizenApi.get('/odayakana/risuto');
            console.log(data);
            dispatch(onLoadAlerts(data.alertas));
            dispatch(onIsLoagingAlert(false));
            dispatch(onSetTotal(data.alertas.length))
            Swal.close();
        } catch (error) {
            console.log(error)
            Swal.close();
        }
    }


    const starNewSocketSerene = (alerta) => {
        dispatch(onAddNewAlert(alerta));
        Swal.close();
    }

    const startClear = () => {
        // dispatch(onViewAlert({
        //     Id: 0,
        //     fehca: '',
        //     estado: '',
        //     longitud: '',
        //     latitud: '',
        //     est: false
        // }));
    }

    return {
        total,
        alerts,
        starLoadAlertsSerene,
        startClear,
        starNewSocketSerene,
    }
}