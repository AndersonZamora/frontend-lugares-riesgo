import { useState } from 'react';

export const useFormr = (initialForm = {}) => {

    const [formStata, setFormState] = useState(initialForm);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formStata,
            [name]: value
        });
    }

    const onInputCoords = ({ lng, lat }) => {
        setFormState({
            ...formStata,
            longitud: `${lng}`,
            latitud: `${lat}`
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    return {
        ...formStata,
        formStata,
        setFormState,
        onInputChange,
        onResetForm,
        onInputCoords,
    }
}