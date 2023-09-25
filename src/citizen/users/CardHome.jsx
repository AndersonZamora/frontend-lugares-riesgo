import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export const CardHome = ({ children, eve }) => {

    return (
        <div
            className="col-xl-3 col-md-6 mb-4"
            onClick={() => eve(children.ruta)}
            style={{ cursor: 'pointer' }}
        >
            <Card >
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {children.name}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}
