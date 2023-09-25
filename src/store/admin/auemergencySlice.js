import { createSlice } from '@reduxjs/toolkit';

export const auemergencySlice = createSlice({
    name: 'gency',
    initialState: {
        isLoadingGency: false,
        gencys: [
            // tempEvent
        ],
        gencyActive: {
            Id: 0,
            tipo: '',
            celular: '',
            state: false,
        }
    },
    reducers: {
        onLoadGency: (state, { payload = [] }) => {
            payload.forEach(usr => {
                const exists = state.gencys.some(dbPro => dbPro.Id === usr.Id);
                if (!exists) {
                    state.gencys.push(usr);
                }
            })
        },
        onAddNewGency: (state, { payload = {} }) => {
            state.gencys.push(payload);
        },
        onViewGency: (state, { payload }) => {
            state.gencyActive = payload
        },
        onDeleteGency: (state, { payload = 0 }) => {
            state.gencys = state.gencys.filter(cat => cat.Id !== payload);
        },
        onIsLoagingGency: (state, { payload }) => {
            state.isLoadingGency = payload
        },
        onLogoutGency: (state) => {
            state.isLoadingGency = false;
            state.gencys = [];
            gencyActive = {
                Id: 0,
                tipo: '',
                celular: '',
                state: false,
            };
        },
    }
});

export const {
    onAddNewGency,
    onDeleteGency,
    onLoadGency,
    onLogoutGency,
    onIsLoagingGency,
    onViewGency,
} = auemergencySlice.actions;