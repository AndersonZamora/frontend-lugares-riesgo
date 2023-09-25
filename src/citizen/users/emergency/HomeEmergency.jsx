import { useEffect } from 'react';
import { useAdGency } from '../../../hooks';
import { LayoutContainer } from '../../../layout';
import { CardEmergency } from './CardEmergency';

export const HomeEmergency = () => {

    const { gencys, startLoadingGency } = useAdGency();

    useEffect(() => {
        startLoadingGency();
    }, [])


    return (
        <LayoutContainer>
            <div className="row">
                {
                    gencys.map(car => (
                        <CardEmergency
                            children={car}
                            key={car.Id}
                        />
                    ))
                }
            </div>
        </LayoutContainer>
    )
}
