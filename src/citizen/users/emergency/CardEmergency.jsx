import { Card, CardContent, Typography } from '@mui/material';

export const CardEmergency = ({ children }) => {

    return (
        <div className="col-xl-3 col-md-6 mb-4">
            <Card>
                <CardContent className='text-center'>
                    <Typography gutterBottom variant="h5" component="div">
                        {children.tipo}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {children.numero}
                    </Typography>
                    <a href={`tel:${children.numero}`} type='button'>llamar</a>
                </CardContent>
            </Card>
        </div>
    )
}
