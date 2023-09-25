import { Button, Form } from 'react-bootstrap';
import { LayoutContainerCard } from '../../../layout';
import { useAdMapBox, useAdPlace, useFormr } from '../../../hooks';
import { useVPlace } from '../../../validator';
import { useEffect } from 'react';

const puntoInicial = {
    lng: -78.51754,
    lat: -7.15695,
    zoom: 15
}

export const NewPlace = () => {

    const { detalle, direccion, barrio, nivel, formStata, onInputChange, onInputCoords } = useFormr({
        detalle: '', direccion: '', barrio: '', longitud: '', latitud: '', nivel: ''
    });

    const { coords, setRef } = useAdMapBox(puntoInicial);

    const { valDeta, valDire, valBarr, valNive, state } = useVPlace(formStata);

    const { starNewPlace } = useAdPlace();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (state) {
            starNewPlace(formStata);
        }
    }

    useEffect(() => {
        onInputCoords(coords);
    }, [coords])



    return (
        <LayoutContainerCard widt={800}>

            <Form onSubmit={handleSubmit} className="info user">
                <Form.Group className='row'>
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <Form.Control
                            className={`${valBarr}`}
                            type="text"
                            value={barrio}
                            name="barrio"
                            onChange={onInputChange}
                            placeholder="Barrio"
                        />
                    </div>
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <Form.Control
                            type="text"
                            className={`${valDeta}`}
                            value={detalle}
                            name="detalle"
                            onChange={onInputChange}
                            placeholder='Detalle'
                        />
                    </div>
                </Form.Group>
                <br />
                <Form.Group className='row'>
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <Form.Control
                            className={`${valDire}`}
                            type="text"
                            value={direccion}
                            name="direccion"
                            onChange={onInputChange}
                            placeholder="Dirección"
                        />
                    </div>
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <Form.Select
                            value={nivel}
                            name="nivel"
                            className={`${valNive}`}
                            onChange={onInputChange}
                        >
                            <option value="">Seleccione Nivel</option>
                            <option value="Bajo">Bajo</option>
                            <option value="Medio">Medio</option>
                            <option value="Alto">Alto</option>
                        </Form.Select>
                    </div>
                </Form.Group>
                <br />
                <Form.Group className='row'>
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <Form.Control
                            disabled
                            type="text"
                            value={coords.lat}
                            name="latitud"
                            onChange={onInputChange}
                            placeholder="Latitud"
                        />
                    </div>
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <Form.Control
                            disabled
                            type="text"
                            value={coords.lng}
                            name="longitud"
                            onChange={onInputChange}
                            placeholder="Longitud"
                        />
                    </div>
                </Form.Group>
                <br />
                <div className='text-center'>
                    <Button type='onSumit' variant='lg' className="btn btn-primary btn-user btn-block">
                        Registrar
                    </Button>
                </div>
            </Form>
            <div
                ref={setRef}
                className='mapContainer'
            >
            </div>

        </LayoutContainerCard>
    )
}
