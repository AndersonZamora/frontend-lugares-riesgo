import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AiFillAlert } from 'react-icons/ai'
import addNotification from 'react-push-notification';
import Swal from 'sweetalert2';
import { LayoutNav } from '../../layout';
import { useAuthStore, useSeAlert } from '../../hooks';
import { ModalSerene } from './ModalSerene';

export const NavSerene = () => {

    const { user } = useAuthStore()

    const [modalShow, setModalShow] = useState(false);

    const handleRemoveMenu = () => {
        const nav = document.querySelector('#navbarSupportedContent');
        nav.classList.remove('show');
    }

    const { total, alerts, alertActive, starLoadAlertsSerene, starUpdateAlert } = useSeAlert();

    useEffect(() => {

        if (alertActive.Id != 0) {

            addNotification({
                title: 'Alerta enviada',
                message: `El usuario  ${alertActive.nombres} identificado con DNI: ${alertActive.dni} envio una alertar a las ${alertActive.fecha}`,
                duration: 9000,
                native: true
            })

            Swal.fire({
                title: `El usuario:  ${alertActive.nombres} - identificado con DNI: ${alertActive.dni} envio 
                una alertar a las: ${alertActive.fecha}`,
                showCancelButton: true,
                confirmButtonText: 'Atender',
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Saved!', '', 'success')
                    starUpdateAlert({ id: alertActive.Id, estado: 'pendiente' })
                }
            })

        }
    }, [alertActive])

    useEffect(() => {
        starLoadAlertsSerene();
    }, []);

    return (
        <LayoutNav>
            <NavLink
                to="/"
                className="navbar-brand"
            >
                Vigilantes Online
            </NavLink >
            <div className='view-displ'>
                <a className=''
                    href="#"
                    style={{ marginRight: 50, marginBottom: 0 }}
                    onClick={() => setModalShow(true)}
                >
                    <AiFillAlert
                        style={{
                            color: 'white',
                            transform: 'scale(1.5)'
                        }}
                    />
                    <span
                        className="badge badge-danger badge-counter"
                        style={{
                            color: 'white',
                            backgroundColor: '#e74a3b',
                            position: 'absolute',
                            transform: 'scale(1)',
                            marginRight: '1.1rem',
                            marginTop: '-0.25rem',
                        }}
                    >
                        {total}
                    </span>
                </a>
            </div>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0" />
                <div className='d-flex'>
                    <a
                        className='view-displ-nor'
                        href="#"
                        style={{ marginRight: 50, marginBottom: 0 }}
                        onClick={() => setModalShow(true)}
                    >
                        <AiFillAlert
                            style={{
                                color: 'white',
                                transform: 'scale(1.5)'
                            }}
                        />
                        <span
                            className="badge badge-danger badge-counter"
                            style={{
                                color: 'white',
                                backgroundColor: '#e74a3b',
                                position: 'absolute',
                                transform: 'scale(1)',
                                marginRight: '1.1rem',
                                marginTop: '-0.25rem',
                            }}
                        >
                            {total}
                        </span>
                    </a>

                    <li
                        style={{ listStyle: 'none' }}
                        className="nav-item dropdown no-arrow"
                        onClick={handleRemoveMenu}
                    >
                        <NavLink
                            to="/perfil"
                            className="navbar-brand"
                            style={{ fontSize: '13px' }}
                        >
                            {user.name}
                        </NavLink >
                    </li>
                </div>
            </div>

            <ModalSerene
                show={modalShow}
                onHide={() => setModalShow(false)}
                aler={alerts}
                handle={starUpdateAlert}
            />
        </LayoutNav>
    )
}
