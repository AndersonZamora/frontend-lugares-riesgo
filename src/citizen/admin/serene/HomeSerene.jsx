import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from '@mui/material';
import { AiFillEye } from 'react-icons/ai'
import { LayoutContainer } from '../../../layout';
import { useAdSerene } from '../../../hooks';

export const HomeSerene = () => {

    const [filters, setFilters] = useState({ global: { value: null, matchMode: FilterMatchMode.CONTAINS }, });
    const navigate = useNavigate();

    const { startLoadingSerene, startActiveSerene, serenes } = useAdSerene();

    const handleRegistre = () => {
        navigate('/serene/new')
    }

    useEffect(() => {
        startLoadingSerene();
    }, []);

    const handleView = (data) => {
        startActiveSerene(data);
        navigate(`/serene/detail`);
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
            <div className='row'>
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
                value={serenes}
                filters={filters}
                sortMode="multiple"
                paginator
                rows={6}
                rowsPerPageOptions={[6, 10]}
            >
                <Column className='active' field='Id' header="ID" sortable />
                <Column field='nombres' header="Nombres" sortable />
                <Column field='apellidos' header="Apellidos" sortable />
                <Column field='celular' header="Celular" sortable />
                <Column field='correo' header="Correo" />

                <Column body={actionTemplate} header='Ver' headerClassName="w-10rem" />
            </DataTable>
        </LayoutContainer>
    )
}
