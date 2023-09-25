import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from '@mui/material';
import { AiFillEye } from 'react-icons/ai'
import { LayoutContainer } from '../../../layout';
import { useAdInfo } from '../../../hooks';

export const HomeInfo = () => {
    const [filters, setFilters] = useState({ global: { value: null, matchMode: FilterMatchMode.CONTAINS }, });
    const navigate = useNavigate();

    const { startLoadingInfo, startActiveInfo, infos, viewInfo } = useAdInfo();

    const handleRegistre = () => {
        navigate('/info/new')
    }

    useEffect(() => {
        startLoadingInfo();
    }, []);

    const handleView = (data) => {
        startActiveInfo(data);
        navigate(`/info/detail`);
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
            <div className='row mb-2'>
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
                {
                    (!viewInfo) && (
                        <div className='col text-center mt-1'>
                            <Button onClick={() => handleRegistre()}>Nuevo Registro</Button>
                        </div>
                    )
                }

            </div>

            <DataTable
                value={infos}
                filters={filters}
                sortMode="multiple"
                paginator
                rows={6}
                rowsPerPageOptions={[6, 10]}
            >
                <Column className='active' field='Id' header="ID" sortable />
                <Column field='fecha' header="Fecha" sortable />
                <Column field='datos' header="Descripción" sortable />
                {
                    (!viewInfo) && (
                        <Column body={actionTemplate} header='Ver' headerClassName="w-10rem" />
                    )
                }
            </DataTable>
        </LayoutContainer>
    )
}
