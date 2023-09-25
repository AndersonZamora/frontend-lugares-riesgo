import { useMemo, useState } from 'react';
import validator from "validator";

const model = {
    datos: '',
    fecha: '',
    link: '',
}

export const useVInfo = (formState = model) => {

    const [valData, setValData] = useState({
        valDato: '',
        valFech: '',
        valLink: '',
    });

    const [val, setVal] = useState({ state: false });

    useMemo(() => {
        setValData({
            ...valData,
            valDato: (!validator.isEmpty(formState.datos) &&
                validator.isLength(formState.datos, { min: 1 }) &&
                validator.isAlphanumeric(formState.datos, 'es-ES', { ignore: ' .):(' })
            ) ? '' : 'is-invalid',
            valLink: (validator.isURL(formState.link)
            ) ? '' : 'is-invalid',
            valFech: (!validator.isEmpty(formState.fecha) &&
                !validator.isDate(formState.fecha, ['/'])

            ) ? '' : 'is-invalid',

        })
    }, [formState]);

    useMemo(() => {
        setVal({
            ...val,
            state: validator.isEmpty(valData.valDato) &&
                validator.isEmpty(valData.valFech) &&
                validator.isEmpty(valData.valLink) ? true : false,
        })
    }, [valData]);

    return {
        ...valData,
        ...val
    };
}
