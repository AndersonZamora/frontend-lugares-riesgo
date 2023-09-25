import { useMapBox } from '../../../hooks';

const puntoInicial = {
    lng: -78.5175442,
    lat: -7.1569542,
    zoom: 15
}

export const HomeCritics = () => {

    const { coords, setRef } = useMapBox(puntoInicial);

    return (
        <>
            <div className='info'>
                Lng: {coords.lng} | lat: {coords.lat} | {coords.zoom}
            </div>
            <div
                ref={setRef}
                className='mapContainer'
            >
            </div>
        </>
    )
}
