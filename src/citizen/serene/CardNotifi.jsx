import React from 'react';

export const CardNotifi = ({ children }) => {
    return (
        <>
            <span className='info1 info2'>{children.fecha}</span><br />
            <span className='info1 info2'>{children.nombres} {children.apellidos}</span><br />
            <span className='info1 info2'>{children.dni}</span><br />
            <span className='info1 info2'>{children.celular}</span><br />
            <hr />
        </>
    )
}
