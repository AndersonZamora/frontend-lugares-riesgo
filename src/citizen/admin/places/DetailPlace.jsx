import { Navigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { LayoutContainerCard } from '../../../layout';
import { useAdPlace, useFormr } from '../../../hooks';
import { useVPlace } from '../../../validator';

export const DetailPlace = () => {

    const { placeActive, startDeletePlace, startCancel, starUpdatePlace } = useAdPlace();

    if (!placeActive.state) {
        return <Navigate to="/emergency" />
    }

    const { barrio, detalle, direccion, nivel, latitud, longitud, formStata, onInputChange } = useFormr(placeActive);
    const { valBarr, valDeta, valDire, valNive, valLati, valLong, state } = useVPlace(formStata);

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
                startDeletePlace(placeActive.Id);
            }
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // if (state) {
        //     starUpdatePlace(formStata)
        // }
    }

    return (
        <LayoutContainerCard widt={650}>
            <Form onSubmit={handleSubmit} className="user">
                <Form.Group className='row'>
                    <div className="col-sm-6 mb-4 mb-sm-0">
                        <Form.Control
                            className={`${valBarr}`}
                            type="text"
                            value={barrio}
                            name="barrio"
                            onChange={onInputChange}
                            placeholder="Barrio"
                        />
                    </div>
                    <div className="col-sm-6 mb-4 mb-sm-0">
                        <Form.Control
                            type="text"
                            className={`${valDeta}`}
                            value={detalle}
                            name="detalle"
                            onChange={onInputChange}
                            placeholder='Detalle'
                        />
                    </div>
                </Form.Group>
                <br />
                <Form.Group className='row'>
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <Form.Control
                            className={`${valDire}`}
                            type="text"
                            value={direccion}
                            name="direccion"
                            onChange={onInputChange}
                            placeholder="Dirección"
                        />
                    </div>
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <Form.Select
                            name="nivel"
                            className={`${valNive}`}
                            value={nivel}
                            onChange={onInputChange}
                        >
                            <option value="">Seleccione Nivel</option>
                            <option value="Bajo">Bajo</option>
                            <option value="Medio">Medio</option>
                            <option value="Alto">Alto</option>
                        </Form.Select>
                    </div>
                </Form.Group>
                <br />
                <Form.Group className='row'>
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <Form.Control
                            className={`${valLati}`}
                            type="text"
                            value={latitud}
                            name="latitud"
                            onChange={onInputChange}
                            placeholder="Latitud"
                        />
                    </div>
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <Form.Control
                            className={`${valLong}`}
                            type="text"
                            value={longitud}
                            name="longitud"
                            onChange={onInputChange}
                            placeholder="Longitud"
                        />
                    </div>
                </Form.Group>
                <br />
                <div className='text-center'>
                    {/* <Button type='onSumit' variant="outline-success" className="m-1">
                        Actualizar
                    </Button> */}
                    <Button onClick={() => handleDelete()} variant="outline-danger" className="m-1">
                        Eliminar
                    </Button>
                    <Button onClick={() => startCancel()} className="m-1 btn btn-primary btn-user btn-block">
                        Regresar
                    </Button>
                </div>
            </Form>
            {/* <List sx={{ width: '100%', maxWidth: 360 }}>
                <ListItem>
                    <ListItemText
                        primary="Barrio" secondary={`${placeActive.barrio}`} />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Nivel" secondary={`${placeActive.nivel}`} />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Dirección" secondary={`${placeActive.direccion}`} />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Detalle" secondary={`${placeActive.detalle}`} />
                </ListItem>
            </List>
            <CardActions>
                <Button onClick={() => handleDelete()} variant="outlined" size="small" color="error">Eliminar</Button>
                <Button onClick={() => startCancel()} variant="contained" size="small" color="secondary">Regresar</Button>
            </CardActions> */}
        </LayoutContainerCard>
    )
}
