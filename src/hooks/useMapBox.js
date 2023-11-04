import { useCallback, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useAdPlace } from './';
import { getEnvVariables } from '../helpers';
const { TOKEN } = getEnvVariables();

mapboxgl.accessToken = TOKEN;

export const useMapBox = (puntoInicial) => {

    const { places } = useAdPlace()

    const mapDiv = useRef();
    const setRef = useCallback((node) => {
        mapDiv.current = node;
    }, []);

    const mapa = useRef();
    const [coords, setCoords] = useState(puntoInicial);


    useEffect(() => {

        const map = new mapboxgl.Map({
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [puntoInicial.lng, puntoInicial.lat],
            zoom: coords.zoom
        });

        mapa.current = map;

    }, [puntoInicial]);

    useEffect(() => {
        mapa.current?.on('move', () => {
            const { lng, lat } = mapa.current.getCenter();
            setCoords({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: mapa.current.getZoom().toFixed(2)
            })
        });
    }, []);

    useEffect(() => {

        setTimeout(() => {
            if (places.length > 0) {
                places.map(pla => {

                    const popup = new mapboxgl.Popup().setHTML(`
                    <p>Nivel: ${pla.nivel}</p>
                    <p>Barrio: ${pla.barrio}</p>
                    <p>Dirección: ${pla.direccion}</p>
                    <p>Detalle: ${pla.detalle}</p>
                    `);

                    const marker = new mapboxgl.Marker();
                    marker.id = pla.Id;
                    marker.setLngLat([pla.longitud, pla.latitud]).setPopup(popup).addTo(mapa.current)
                });
            }

        }, 3000);
    }, [places]);

    return {
        coords,
        setRef
    }
}