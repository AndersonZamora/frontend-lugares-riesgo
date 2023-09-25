import { useMemo, useState } from 'react';
import validator from "validator";

const model = {
    detalle: '',
    direccion: '',
    barrio: '',
    longitud: '',
    latitud: '',
    nivel: ''
}

export const useVPlace = (formState = model) => {

    const [valData, setValData] = useState({
        valDeta: '',
        valDire: '',
        valBarr: '',
        valLong: '',
        valLati: '',
        valNive: '',
    });

    const [val, setVal] = useState({ state: false });

    useMemo(() => {
        setValData({
            ...valData,
            valDeta: (!validator.isEmpty(formState.detalle) &&
                validator.isLength(formState.detalle, { min: 1 }) &&
                validator.isAlphanumeric(formState.detalle, 'es-ES', { ignore: ' ' })
            ) ? '' : 'is-invalid',
            valDire: (!validator.isEmpty(formState.direccion) &&
                validator.isLength(formState.direccion, { min: 1, }) &&
                validator.isAlphanumeric(formState.direccion, 'es-ES', { ignore: ' .-_' })
            ) ? '' : 'is-invalid',
            valBarr: (!validator.isEmpty(formState.barrio) &&
                validator.isLength(formState.barrio, { min: 1, }) &&
                validator.isAlphanumeric(formState.barrio, 'es-ES', { ignore: ' ' })
            ) ? '' : 'is-invalid',
            valNive: (!validator.isEmpty(formState.nivel) &&
                validator.isLength(formState.nivel, { min: 1, max: 25 }) &&
                validator.isAlphanumeric(formState.nivel, 'es-ES', { ignore: ' ' })
            ) ? '' : 'is-invalid',
        })
    }, [formState]);

    useMemo(() => {
        setVal({
            ...val,
            state: validator.isEmpty(valData.valDeta) &&
                validator.isEmpty(valData.valDire) &&
                validator.isEmpty(valData.valBarr) &&
                validator.isEmpty(valData.valLong) &&
                validator.isEmpty(valData.valLati) &&
                validator.isEmpty(valData.valNive) ? true : false,
        })
    }, [valData]);

    return {
        ...valData,
        ...val
    };
}

