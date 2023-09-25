import { Grid } from '@mui/material';
import { Container, Row } from 'react-bootstrap';

export const LayoutAuth = ({ children, title }) => {
    return (
        <Grid
            className='animate__animated animate__fadeIn'
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{ minHeight: '100vh', padding: 4 }}
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
                            <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">{title}</h1>
                                    </div>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}
