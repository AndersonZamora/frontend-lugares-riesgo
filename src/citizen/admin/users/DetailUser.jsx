import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, CardActions, List, ListItem, ListItemText } from '@mui/material';
import { AiFillDelete } from 'react-icons/ai'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Swal from 'sweetalert2';
import { LayoutHist } from '../../../layout';
import { useAdUsers } from '../../../hooks';

export const DetailUser = () => {

    const { userActive, alerts, startDeleteUser, startCancel, startLoadingCitizenAlerts, startDeleteUserAlert } = useAdUsers();

    if (!userActive.state) {
        return <Navigate to="/users" />
    }

    const handleView = (data) => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "¡No podras revirtir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, bórralo!'
        }).then((result) => {
            if (result.isConfirmed) {
                startDeleteUserAlert(data.Id)
            }
        });
    }

    useEffect(() => {
        startLoadingCitizenAlerts();
    }, []);

    const actionTemplate = (data) => {
        return (
            <div
                onClick={() => handleView(data)}
                className="flex flex-wrap gap-2"
                style={{ cursor: 'pointer' }}
            >
                <AiFillDelete style={{ color: '#c1322b', fontSize: '20px' }} />
            </div>
        );
    };


    const handleDelete = () => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "¡Recuerda si el usuario tiene un historial no podras eliminarlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, bórralo!'
        }).then((result) => {
            if (result.isConfirmed) {
                startDeleteUser(userActive.Id);
            }
        });
    }

    return (
        <LayoutHist >
            <>
                <div className="col-lg-6 ">
                    <DataTable
                        value={alerts}
                        sortMode="multiple"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10]}
                    >
                        <Column className='active' field='Id' header="ID" sortable />
                        <Column field='fecha' header="Fecha" sortable />
                        <Column field='estado' header="Estado" sortable />
                        <Column body={actionTemplate} header='Eliminar' headerClassName="w-10rem" />
                    </DataTable>

                </div>
                <div className="col-lg-6">
                    <div className="p-5">
                        <div className="text-center">
                            <h1 className="h4 text-gray-900 mb-4">
                                Historial del usuario
                            </h1>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Nombres" secondary={`${userActive.nombres}`} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Apellidos" secondary={`${userActive.apellidos}`} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Celular" secondary={`${userActive.celular}`} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Correo" secondary={`${userActive.correo}`} />
                                </ListItem>
                            </List>
                            <CardActions>
                                <Button onClick={() => handleDelete()} variant="outlined" size="small" color="error">Eliminar</Button>
                                <Button onClick={() => startCancel()} variant="contained" size="small" color="secondary">Regresar</Button>
                            </CardActions>
                        </div>
                    </div>
                </div>
            </>
        </LayoutHist>
    )
}
