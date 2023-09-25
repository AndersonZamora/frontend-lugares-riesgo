import { createSlice } from '@reduxjs/toolkit';

export const auplacesSlice = createSlice({
    name: 'places',
    initialState: {
        isLoadingPlaces: false,
        places: [
            // tempEvent
        ],
        placeActive: {
            Id: 0,
            detalle: '',
            direccion: '',
            barrio: '',
            longitud: '',
            latitud: '',
            nivel: '',
            state: false,
        }
    },
    reducers: {
        onLoadPlaces: (state, { payload = [] }) => {
            payload.forEach(usr => {
                const exists = state.places.some(dbPro => dbPro.Id === usr.Id);
                if (!exists) {
                    state.places.push(usr);
                }
            })
        },
        onAddNewPlace: (state, { payload = {} }) => {
            state.places.push(payload);
        },
        onUpdatePlace: (state, { payload = {} }) => {
            state.places = state.places.map(cat => {
                if (cat.Id === payload.Id) {
                    return payload;
                }
                return cat;
            });
        },
        onViewPlace: (state, { payload }) => {
            state.placeActive = payload
        },
        onDeletePlaces: (state, { payload = 0 }) => {
            state.places = state.places.filter(cat => cat.Id !== payload);
        },
        onIsLoagingPlace: (state, { payload }) => {
            state.isLoadingPlaces = payload
        },
        onLogoutPlace: (state) => {
            state.isLoadingPlaces = false;
            state.places = [];
            state.placeActive = {
                Id: 0,
                detalle: '',
                direccion: '',
                barrio: '',
                longitud: '',
                latitud: '',
                nivel: '',
                state: false,
            }
        },
    }
});

export const {
    onAddNewPlace,
    onDeletePlaces,
    onLoadPlaces,
    onLogoutPlace,
    onIsLoagingPlace,
    onViewPlace,
    onUpdatePlace,
} = auplacesSlice.actions;