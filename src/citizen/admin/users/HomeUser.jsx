import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { AiFillEye } from 'react-icons/ai'
import { LayoutContainer } from '../../../layout'
import { useAdUsers } from '../../../hooks'

export const HomeUser = () => {

    const { startLoadingCitizen, users, startActiveUser } = useAdUsers();
    const [filters, setFilters] = useState({ global: { value: null, matchMode: FilterMatchMode.CONTAINS }, });

    useEffect(() => {
        startLoadingCitizen();
    }, []);

    const navigate = useNavigate();

    const handleView = (data) => {
        startActiveUser({ ...data });
        navigate('/users/detail');
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
            <div className='flex justify-content-end'>
                <InputText
                    placeholder='Búsqueda global'
                    onInput={(e) => {
                        setFilters({
                            global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS }
                        })
                    }}
                />
            </div>

            <DataTable
                value={users}
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
