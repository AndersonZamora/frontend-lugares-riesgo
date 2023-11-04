import { Button } from 'react-bootstrap';

export const CardNotifi = ({ children, handle }) => {
    return (
        <div className='text-center'>
            <span className='info1 info2'>{children.fecha}</span><br />
            <span className='info1 info2'>{children.nombres} {children.apellidos}</span><br />
            <span className='info1 info2'>{children.dni}</span><br />
            <span className='info1 info2'>{children.celular}</span><br />
            <span className='info1 info2'>{children.estado}</span><br />
            <Button onClick={() => handle({ id: children.Id, estado: 'atendido' })} style={{ marginTop: 10 }}>Atendido</Button>
            <hr />
        </div>
    )
}
