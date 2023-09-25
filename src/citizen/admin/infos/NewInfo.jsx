import { Button, Form } from 'react-bootstrap';
import { LayoutContainerCard } from '../../../layout';
import { useAdInfo, useFormr } from '../../../hooks';
import { useVInfo, useVPlace } from '../../../validator';

export const NewInfo = () => {

    const { datos, link, fecha, formStata, onInputChange } = useFormr({ datos: '', link: '', fecha: '' });
    const { starNewInfo } = useAdInfo();

    const { valDato, valLink, valFech, state } = useVInfo(formStata);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (state) {
            starNewInfo(formStata);
        }
    }

    return (
        <LayoutContainerCard widt={500}>
            <Form onSubmit={handleSubmit} className="user">

                <Form.Control
                    className={`${valDato}`}
                    as="textarea"
                    rows={3}
                    value={datos}
                    name="datos"
                    onChange={onInputChange}
                    placeholder="Descripción"
                />
                <br />
                <Form.Control
                    as="textarea"
                    rows={3}
                    className={`${valLink}`}
                    value={link}
                    name="link"
                    onChange={onInputChange}
                    placeholder='Url de publicación'
                />
                <br />
                <Form.Control
                    type="date"
                    className={`${valFech}`}
                    value={fecha}
                    name="fecha"
                    onChange={onInputChange}
                />
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
