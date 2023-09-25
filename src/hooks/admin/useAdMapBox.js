import { useCallback, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kZXJzb25zdHVkIiwiYSI6ImNsbXI1b3lzZzAzZ3IybHBsdWl3bXhhY2wifQ.p1cEUOXuTxweERs3FMpoRg';

export const useAdMapBox = (puntoInicial) => {

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

    const addMark = useCallback(() => {

        const { lng, lat } = puntoInicial;
        const marker = new mapboxgl.Marker();
        marker.id = 1;
        marker.setLngLat({ lng, lat })
            .addTo(mapa.current)
            .setDraggable(true);

        marker.on('drag', ({ target }) => {
            const { lng, lat } = target.getLngLat();
            setCoords({
                lng: lng.toFixed(5),
                lat: lat.toFixed(5),
                zoom: mapa.current.getZoom().toFixed(2)
            })
        })
    }, [])

    useEffect(() => {
        addMark();
    }, [addMark]);

    return {
        coords,
        setRef
    }
}