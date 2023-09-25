import { Button, Form } from 'react-bootstrap';
import { LayoutContainerCard } from '../../../layout';
import { useAdGency, useFormr } from '../../../hooks';
import { useVGency } from '../../../validator';

export const NewEmergency = () => {

    const { tipo, numero, formStata, onInputChange } = useFormr({ tipo: '', numero: '' });

    const { valTipo, valNume, state } = useVGency(formStata);

    const { starNewGency } = useAdGency();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (state) {
            starNewGency(formStata);
        }
    }

    return (
        <LayoutContainerCard widt={500}>
            <Form onSubmit={handleSubmit} className="user">
                <Form.Group className='row'>
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <Form.Control
                            className={`${valTipo}`}
                            type="text"
                            value={tipo}
                            name="tipo"
                            onChange={onInputChange}
                            placeholder="Nombre"
                        />
                    </div>
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <Form.Control
                            type="text"
                            className={`${valNume}`}
                            value={numero}
                            name="numero"
                            onChange={onInputChange}
                            placeholder='Celular'
                        />
                    </div>
                </Form.Group>
                <br />
                <div className='text-center'>
                    <Button type='onSumit' className="btn btn-primary btn-user btn-block">
                        Registrar
                    </Button>
                </div>
            </Form>
        </LayoutContainerCard>
    )
}
