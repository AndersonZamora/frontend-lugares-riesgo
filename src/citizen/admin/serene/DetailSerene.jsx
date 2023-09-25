import { Navigate } from 'react-router-dom';
import { Button, CardActions, List, ListItem, ListItemText } from '@mui/material';
import Swal from 'sweetalert2';
import { LayoutContainerCard } from '../../../layout';
import { useAdSerene } from '../../../hooks';

export const DetailSerene = () => {

    const { sereneActive, startCancel, startDeleteSerene } = useAdSerene();

    if (!sereneActive.state) {
        return <Navigate to="/serene" />
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
                startDeleteSerene(sereneActive.Id);
            }
        });
    }
    return (
        <LayoutContainerCard widt={400}>
            <List sx={{ width: '100%', maxWidth: 360 }}>
                <ListItem>
                    <ListItemText
                        primary="Nombres" secondary={`${sereneActive.nombres}`} />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Apellidos" secondary={`${sereneActive.apellidos}`} />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Celular" secondary={`${sereneActive.celular}`} />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Correo" secondary={`${sereneActive.correo}`} />
                </ListItem>
            </List>
            <CardActions>
                <Button onClick={() => handleDelete()} variant="outlined" size="small" color="error">Eliminar</Button>
                <Button onClick={() => startCancel()} variant="contained" size="small" color="secondary">Regresar</Button>
            </CardActions>
        </LayoutContainerCard>
    )
}
