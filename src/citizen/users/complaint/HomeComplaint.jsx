import { LayoutContainerCard } from '../../../layout';
import { Button, Form } from 'react-bootstrap';
import { Typography } from '@mui/material';
import { errorAlert, progressBar } from '../../../helpers';
import { useUsAlert } from '../../../hooks';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { SocketContext } from '../../../context/SocketContext';

export const HomeComplaint = () => {

    const { isLoadingAlert, est, estado, fecha, starNewAlert, startClear } = useUsAlert();
    const { socket } = useContext(SocketContext);

    const handleSumit = (event) => {
        event.preventDefault();
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function (position) {
            const aler = {
                fecha: new Date().toLocaleString(),
                latitud: position.coords.latitude,
                longitud: position.coords.longitude
            }
            progressBar('Registrando...');
            starNewAlert(aler, socket)
        }, function () {
            errorAlert('Se nego el acceso a la ubicación')
        });
    }

    return (
        <LayoutContainerCard widt={400}>
            {
                (!est) ?
                    (
                        <>
                            <div className='text-center'>
                                <Typography variant="h4" className="mb-3">DENUNCIA</Typography>
                                <Typography variant="p">Recuerda activar tu ubicación</Typography>
                                <hr />
                                <Typography
                                    sx={{ color: 'red' }}
                                    variant="p"
                                >
                                    Si envias denuncias falsas, tu cuenta sera eliminada y puedes resivir una multa
                                </Typography>
                            </div>

                            <Form className="user" onSubmit={handleSumit}>
                                <br />
                                <div className='text-center'>
                                    <Button disabled={isLoadingAlert} type='onSumit' size="lg" variant="primary">
                                        Denuncia
                                    </Button>
                                </div>
                            </Form>
                        </>
                    )
                    :
                    (
                        <>
                            <div className='text-center'>
                                <Typography variant="h4" className="mb-3">DENUNCIA</Typography>
                                <Typography variant="p">Estado: {estado}</Typography> <br />
                                <Typography variant="p">Fecha: {fecha}</Typography> <br />
                                <hr />
                                <Typography
                                    sx={{ color: 'red' }}
                                    variant="p"
                                >
                                    Si envias denuncias falsas, tu cuenta sera eliminada y puedes resivir una multa
                                </Typography>
                                <br />
                                <Button onClick={startClear} className='m-3'>Nueva de nuncia</Button>
                            </div>
                        </>
                    )
            }
            <div className='text-center mt-3'>
                <NavLink
                    to="/complaint/history"
                    style={{ color: '#3c3c3c', textDecoration: 'none' }}
                >
                    Historial de denuncias
                </NavLink>
            </div>
        </LayoutContainerCard>
    )
}
