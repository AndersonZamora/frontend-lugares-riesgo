import { Box, Card, CardContent, Link, ListItem, ListItemText, Typography } from '@mui/material';

export const CardInfo = ({ children }) => {
    return (
        <div className="col-xl-3 col-md-6 mb-4">
            <Box>
                <Card sx={{ minHeight: 240 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {children.fecha}
                        </Typography>
                        <Typography variant="body2">
                            {children.datos}
                        </Typography>
                        <Link
                            className='m-2'
                            component="button"
                            variant={`${children.link}`}
                            onClick={() => { window.open(`${children.link}`) }}
                        >
                            <ListItemText primary="Visitar publicacion" />
                        </Link>
                    </CardContent>
                </Card>
            </Box >
        </div>
    )
}
