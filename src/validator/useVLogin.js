import { useMemo, useState } from 'react';
import validator from "validator";

export const useVLogin = (formState = { email: '', password: '' }) => {

    const [valData, setValData] = useState({
        valEmail: '',
        valPass: '',
    });

    const [val, setVal] = useState({ state: false });

    useMemo(() => {
        setValData({
            ...valData,
            valEmail: (validator.isEmail(formState.email)) ? '' : 'is-invalid',
            valPass: (!validator.isEmpty(formState.password) && validator.isLength(formState.password, { min: 5, max: 15 }) &&
                validator.isAlphanumeric(formState.password, 'es-ES', { ignore: '#@' })) ? '' : 'is-invalid',
        })
    }, [formState]);

    useMemo(() => {
        setVal({
            ...val,
            state: validator.isEmpty(valData.valEmail) &&
                validator.isEmpty(valData.valPass) ? true : false,
        })
    }, [valData]);

    return {
        ...valData,
        ...val
    };
}

