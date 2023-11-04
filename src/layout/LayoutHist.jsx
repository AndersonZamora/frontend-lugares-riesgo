import { Grid } from '@mui/material';

export const LayoutHist = ({ children }) => {
    return (
        <Grid
            className='animate__animated animate__fadeIn'
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
        >
            <Grid item
                className="justify-content-center"
                xl={10}
                lg={10}
                md={9}
                sx={{
                    borderRadius: 2,
                    width: { sm: 550, md: 900, lg: 1300 }
                }}
            >
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            {children}
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}
