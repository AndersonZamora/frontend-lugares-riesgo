import { Navigate } from 'react-router-dom';
import { Button, CardActions, Link, List, ListItem, ListItemText } from '@mui/material';
import Swal from 'sweetalert2';
import { LayoutContainerCard } from '../../../layout';
import { useAdInfo } from '../../../hooks';

export const DetailInfo = () => {

    const { infoActive, startDeleteInfo, startCancel } = useAdInfo();

    if (!infoActive.state) {
        return <Navigate to="/info" />
    }

    const handleDelete = () => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, bórralo!'
        }).then((result) => {
            if (result.isConfirmed) {
                startDeleteInfo(infoActive.Id);
            }
        });
    }

    const handleOpen = () => {
        window.open(`${infoActive.link}`);
    }

    return (
        <LayoutContainerCard widt={400}>
            <List sx={{ width: '100%', maxWidth: 360 }}>
                <ListItem>
                    <ListItemText
                        primary="Descripción" secondary={`${infoActive.datos}`} />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Fecha" secondary={`${infoActive.fecha}`} />
                </ListItem>

                <Link
                    className='m-2'
                    component="button"
                    variant={`${infoActive.link}`}
                    onClick={() => { window.open(`${infoActive.link}`) }}
                >
                    <ListItem>
                        <ListItemText primary="Link" secondary={`${infoActive.link}`} />
                    </ListItem>
                </Link>
            </List>
            <CardActions>
                <Button onClick={() => handleDelete()} variant="outlined" size="small" color="error">Eliminar</Button>
                <Button onClick={() => startCancel()} variant="contained" size="small" color="secondary">Regresar</Button>
            </CardActions>
        </LayoutContainerCard>
    )
}
