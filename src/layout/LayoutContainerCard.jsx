import { Card, CardContent } from '@mui/material';

export const LayoutContainerCard = ({ children, widt }) => {
    return (
        <div className='animate__animated animate__fadeIn back-dashboard p-4 m-3'>
            <Card
                sx={{
                    p: 1,
                    margin: 'auto',
                    maxWidth: widt,
                    flexFlow: 1,
                    background: '#f1f2f6',
                }}
            >
                <CardContent >
                    {children}
                </CardContent>
            </Card>
        </div>
    )
}
