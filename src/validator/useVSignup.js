import { useMemo, useState } from 'react';
import validator from "validator";

export const useVSignup = (formState = { nombres: '', apellidos: '', celular: '', correo: '', contrasenia: '' }) => {

    const [valData, setValData] = useState({
        valNomb: '',
        valApell: '',
        valCelul: '',
        valCorre: '',
        valContr: '',
    });

    const [val, setVal] = useState({ state: false });

    useMemo(() => {
        setValData({
            ...valData,
            valNomb: (!validator.isEmpty(formState.nombres) &&
                validator.isAlpha(formState.nombres, 'es-ES', { ignore: ' ' }) &&
                validator.isLength(formState.nombres, { min: 3, max: 25 })) ? '' : 'is-invalid',
            valApell: (!validator.isEmpty(formState.apellidos) &&
                validator.isAlpha(formState.apellidos, 'es-ES', { ignore: ' ' }) &&
                validator.isLength(formState.apellidos, { min: 3, max: 25 })) ? '' : 'is-invalid',
            valCelul: (!validator.isEmpty(formState.celular) &&
                validator.isMobilePhone(formState.celular, 'es-PE')) ? '' : 'is-invalid',
            valCorre: (validator.isEmail(formState.correo)) ? '' : 'is-invalid',
            valContr: (!validator.isEmpty(formState.contrasenia) && validator.isLength(formState.contrasenia, { min: 5, max: 15 }) &&
                validator.isAlphanumeric(formState.contrasenia, 'es-ES', { ignore: '#@' })) ? '' : 'is-invalid',
        })
    }, [formState]);

    useMemo(() => {
        setVal({
            ...val,
            state: validator.isEmpty(valData.valNomb) &&
                validator.isEmpty(valData.valApell) &&
                validator.isEmpty(valData.valCelul) &&
                validator.isEmpty(valData.valCorre) &&
                validator.isEmpty(valData.valContr) ? true : false,
        })
    }, [valData]);

    return {
        ...valData,
        ...val
    };
}

