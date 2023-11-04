import { LayoutAuth } from '../layout'
import { Button, Form } from 'react-bootstrap'
import { useAuthStore, useFormr } from '../hooks'
import { useVSignup } from '../validator';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const SignupPage = () => {

    const navigate = useNavigate();
    const [sendAv, setSendAv] = useState(true)

    const { nombres, apellidos, celular, correo, contrasenia, dni, formStata, onInputChange } = useFormr({
        nombres: '', apellidos: '', celular: '', correo: '', contrasenia: '', dni: ''
    });

    const { valNomb, valApell, valCorre, valCelul, valContr, valDNI, state } = useVSignup(formStata);
    const { startSignup, loadindAuth } = useAuthStore();

    const handlePage = () => {
        navigate('/login');
    }

    const loginSubmit = async (event) => {
        event.preventDefault();

        if (state) {
            if (await startSignup(formStata)) {
                navigate('/login');
            }
        }
    }

    return (
        <LayoutAuth title={'¡Crea una cuenta!'}>
            <Form onSubmit={loginSubmit} className="user">
                <Form.Group className='row'>
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <Form.Control
                            className={`${valNomb}`}
                            type="text"
                            value={nombres}
                            name="nombres"
                            onChange={onInputChange}
                            placeholder="Nombres"
                        />
                    </div>
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <Form.Control
                            type="text"
                            className={`${valApell}`}
                            value={apellidos}
                            name="apellidos"
                            onChange={onInputChange}
                            placeholder='Apellidos'
                        />
                    </div>
                </Form.Group>
                <br />
                <Form.Group className='row'>
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <Form.Control
                            type="text"
                            className={`${valDNI}`}
                            value={dni}
                            name="dni"
                            onChange={onInputChange}
                            placeholder='dni'
                        />
                    </div>

                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <Form.Control
                            type="tex"
                            className={`${valCorre}`}
                            value={correo}
                            name="correo"
                            onChange={onInputChange}
                            placeholder="Email"
                        />
                    </div>
                </Form.Group>
                <br />
                <Form.Group className='row'>
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <Form.Control
                            type="text"
                            className={`${valCelul}`}
                            value={celular}
                            name="celular"
                            onChange={onInputChange}
                            placeholder="Celular"
                        />
                    </div>
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <Form.Control
                            type="password"
                            className={`${valContr}`}
                            value={contrasenia}
                            name="contrasenia"
                            onChange={onInputChange}
                            placeholder='Contraseña'
                        />
                    </div>
                </Form.Group>
                <br />
                {
                    (loadindAuth) ?
                        (
                            <div className='text-center'>
                                <span className="loader"></span>
                            </div>
                        ) : (
                            <div className='text-center'>
                                <Button disabled={!state} type='onSumit' variant="primary" size="sm">
                                    Registrar Cuenta
                                </Button>
                            </div>
                        )
                }

                <hr />
                <div className="text-center">
                    <a type='button' onClick={handlePage} className="small" >¿Ya tienes una cuenta? Login!</a>
                </div>
            </Form>
        </LayoutAuth>
    )
}
