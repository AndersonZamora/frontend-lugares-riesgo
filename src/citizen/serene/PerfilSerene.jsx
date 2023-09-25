import { Button, CardActions, List, ListItem, ListItemText } from '@mui/material';
import { LayoutContainerCard } from '../../layout';
import { useAuthStore } from '../../hooks';

export const PerfilSerene = () => {

    const { user, startLogout } = useAuthStore();

    const handleClose = () => {
        startLogout();
    }

    return (
        <LayoutContainerCard widt={400}>
            <List sx={{ width: '100%', maxWidth: 360 }}>
                <ListItem>
                    <ListItemText primary="Nombres" secondary={`${user.name}`} />
                </ListItem>
            </List>
            <CardActions>
                <Button onClick={() => handleClose()} variant="outlined" size="small" color="error">Cerrar Sesión</Button>
            </CardActions>
        </LayoutContainerCard>
    )
}
