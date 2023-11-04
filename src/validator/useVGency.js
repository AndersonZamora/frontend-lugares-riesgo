import { useMemo, useState } from 'react';
import validator from "validator";

export const useVGency = (formState = { tipo: '', numero: '' }) => {

    const [valData, setValData] = useState({
        valTipo: '',
        valNume: '',
    });

    const [val, setVal] = useState({ state: false });

    useMemo(() => {
        setValData({
            ...valData,
            valTipo: (!validator.isEmpty(formState.tipo) && validator.isLength(formState.tipo, { min: 4, max: 12 }) && validator.isAlphanumeric(formState.tipo, 'es-ES')) ? '' : 'is-invalid',
            valNume: (!validator.isEmpty(formState.numero) && validator.isLength(formState.numero, { min: 3, max: 12 })) ? '' : 'is-invalid',
        })
    }, [formState]);

    useMemo(() => {
        setVal({
            ...val,
            state: validator.isEmpty(valData.valTipo) &&
                validator.isEmpty(valData.valNume) ? true : false,
        })
    }, [valData]);

    return {
        ...valData,
        ...val
    };
}

