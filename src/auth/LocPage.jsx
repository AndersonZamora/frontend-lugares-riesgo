import { Grid } from '@mui/material';
import { Button } from 'react-bootstrap';
import { useUi } from '../hooks';

export const LocPage = () => {

    const { startSate } = useUi();

    return (
        <Grid
            className='animate__animated animate__fadeIn'
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{ minHeight: '100vh', padding: 4, backgroundColor: '#9d75e6' }}
        >
            <Grid item
                className="justify-content-center"
                xl={10}
                lg={10}
                md={9}
                sx={{
                    padding: 3,
                    borderRadius: 2,
                    width: { sm: 550, md: 800, lg: 1000 }
                }}
            >
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-6">
                                <h1></h1>
                                <h3 className='text-center mt-5'>Ingrese al Sistema</h3>
                                <br />
                                <div className="text-center">
                                    <Button
                                        onClick={() => startSate('hero')}
                                        variant="warning"
                                    >
                                        Administrativo
                                    </Button>
                                    <br />
                                    <br />
                                    <Button
                                        variant="success"
                                        onClick={() => startSate('citizen')}
                                    >
                                        Ciudadano
                                    </Button>
                                    <br />
                                    <br />
                                    <Button
                                        variant="danger"
                                        onClick={() => startSate('serene')}
                                    >
                                        Serenazgo
                                    </Button>
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                </div>
                            </div>
                            <div className="col-lg-6" style={{ background: 'url(https://media.istockphoto.com/id/880300414/es/foto/sistema-de-vigilancia-o-c%C3%A1mara-de-seguridad-cctv-con-militares-en-el-fondo-borroso.webp?b=1&s=612x612&w=0&k=20&c=Dn7CVCnD21rfPQ1oyoXb2jgDmUxt46MxIab4Pyz6r_A=)' }}>
                            </div>
                        </div>
                    </div>
                </ div>
            </Grid>
        </Grid>
    )
}
