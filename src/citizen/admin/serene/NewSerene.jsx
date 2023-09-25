import { Button, Form } from 'react-bootstrap';
import { LayoutContainerCard } from '../../../layout';
import { useAdSerene, useFormr } from '../../../hooks';
import { useVSignup } from '../../../validator';

export const NewSerene = () => {

    const { nombres, apellidos, celular, correo, contrasenia, formStata, onInputChange } = useFormr({
        nombres: '', apellidos: '', celular: '', correo: '', contrasenia: '',
    });

    const { valNomb, valApell, valCorre, valCelul, valContr, state } = useVSignup(formStata);

    const { starNewSerene } = useAdSerene();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (state) {
            starNewSerene(formStata);
        }
    }

    return (
        <LayoutContainerCard widt={600}>
            <Form onSubmit={handleSubmit} className="user">
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
                <Form.Group>
                    <Form.Control
                        type="tex"
                        className={`${valCorre}`}
                        value={correo}
                        name="correo"
                        onChange={onInputChange}
                        placeholder="Email"
                    />
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
                <br />
                <div className='text-center'>
                    <Button disabled={!state} type='onSumit' className="btn btn-primary btn-user btn-block">
                        Registrar Cuenta
                    </Button>
                </div>
            </Form>
        </LayoutContainerCard>
    )
}
