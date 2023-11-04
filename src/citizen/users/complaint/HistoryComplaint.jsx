import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from '@mui/material';
import { LayoutContainer } from '../../../layout';
import { useUsAlert } from '../../../hooks';

export const HistoryComplaint = () => {

    const [filters, setFilters] = useState({ global: { value: null, matchMode: FilterMatchMode.CONTAINS }, });
    const navigate = useNavigate();

    const handleRegistre = () => {
        navigate('/complaint')
    }

    const { starLoadAlertSend, alerts } = useUsAlert();

    useEffect(() => {
        starLoadAlertSend();
    }, [])

    return (
        <LayoutContainer>
            <div className='row mb-1'>
                <div className='col text-center'>
                    <InputText
                        placeholder='Búsqueda global'
                        onInput={(e) => {
                            setFilters({
                                global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS }
                            })
                        }}
                    />
                </div>
                <div className='col text-center mt-1'>
                    <Button onClick={() => handleRegistre()}>Nueva Denuncia</Button>
                </div>
            </div>

            <DataTable
                value={alerts}
                filters={filters}
                sortMode="multiple"
                paginator
                rows={6}
                rowsPerPageOptions={[6, 10]}
            >
                <Column className='active' field='Id' header="ID" sortable />
                <Column field='fecha' header="Fecha" sortable />
                <Column field='estado' header="Estado" sortable />
            </DataTable>
        </LayoutContainer>
    )
}
