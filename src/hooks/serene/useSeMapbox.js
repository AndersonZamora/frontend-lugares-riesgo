import { useCallback, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useSeAlert } from './useSeAlert';

mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kZXJzb25zdHVkIiwiYSI6ImNsbXI1b3lzZzAzZ3IybHBsdWl3bXhhY2wifQ.p1cEUOXuTxweERs3FMpoRg';

export const useSeMapbox = (puntoInicial) => {

    const { alerts } = useSeAlert();

    const mapDiv = useRef();
    const setRef = useCallback((node) => {
        mapDiv.current = node;
    }, []);

    const mapa = useRef();
    const [coords, setCoords] = useState(puntoInicial);

    useEffect(() => {

        const map = new mapboxgl.Map({
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v12',
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
            if (alerts.length > 0) {
                alerts.map(pla => {

                    const popup = new mapboxgl.Popup().setHTML(`
                    <p>Fecha y Hora: ${pla.fecha}</p>
                    <p>DNI: ${pla.dni}</p>
                    <p>Usuario: ${pla.nombres} ${pla.apellidos}</p>
                    <p>Celular: ${pla.celular}</p>
                    `);

                    const marker = new mapboxgl.Marker();
                    marker.id = pla.Id;
                    marker.setLngLat([pla.longitud, pla.latitud]).setPopup(popup).addTo(mapa.current)
                });
            }
        }, 3000);
    }, [alerts]);

    return {
        coords,
        setRef
    }
}