import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from '@mui/material';
import { AiFillEye } from 'react-icons/ai'
import { LayoutContainer } from '../../../layout';
import { useAdGency } from '../../../hooks';

export const HomeEmergency = () => {

    const [filters, setFilters] = useState({ global: { value: null, matchMode: FilterMatchMode.CONTAINS }, });
    const navigate = useNavigate();

    const { startLoadingGency, startActiveGency, gencys, } = useAdGency();

    const handleRegistre = () => {
        navigate('/emergency/new')
    }

    useEffect(() => {
        startLoadingGency();
    }, []);

    const handleView = (data) => {
        startActiveGency(data);
        navigate(`/emergency/detail`);
    }

    const actionTemplate = (data) => {
        return (
            <div
                onClick={() => handleView(data)}
                className="flex flex-wrap gap-2"
                style={{ cursor: 'pointer' }}
            >
                <AiFillEye style={{ color: '#9b59b6', fontSize: '20px' }} />
            </div>
        );
    };

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
                    <Button onClick={() => handleRegistre()}>Nuevo Registro</Button>
                </div>
            </div>

            <DataTable
                value={gencys}
                filters={filters}
                sortMode="multiple"
                paginator
                rows={6}
                rowsPerPageOptions={[6, 10]}
            >
                <Column className='active' field='Id' header="ID" sortable />
                <Column field='tipo' header="Servicio" sortable />
                <Column field='numero' header="Celular" sortable />

                <Column body={actionTemplate} header='Ver' headerClassName="w-10rem" />
            </DataTable>
        </LayoutContainer>
    )
}
