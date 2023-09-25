import { createSlice } from '@reduxjs/toolkit';

export const usalertSclice = createSlice({
    name: 'alert',
    initialState: {
        isLoadingAlert: false,
        alerts: [
            // tempEvent
        ],
        alertActive: {
            Id: 0,
            fehca: '',
            estado: '',
            longitud: '',
            latitud: '',
            est: false
        },
        total: 0,
    },
    reducers: {
        onLoadAlerts: (state, { payload = [] }) => {
            payload.forEach(usr => {
                const exists = state.alerts.some(dbPro => dbPro.Id === usr.Id);
                if (!exists) {
                    state.alerts.push(usr);
                }
            });
            state.total = state.alerts.length;
        },
        onLoadAlertsScokets: (state, { payload }) => {
            state.alerts = payload;
        },
        onAddNewAlert: (state, { payload = {} }) => {

            const exists = state.alerts.some(dbPro => dbPro.Id === payload.Id);
            if (!exists) {
                state.alerts.push(payload);
                state.total = state.alerts.length;
            }
        },
        onViewAlert: (state, { payload }) => {
            state.alertActive = payload
        },
        onIsLoagingAlert: (state, { payload }) => {
            state.isLoadingAlert = payload
        },
        onLogoutAlert: (state) => {
            state.isLoadingAlert = false;
            state.alerts = [
                // tempEvent
            ];
            state.alertActive = {
                Id: 0,
                fehca: '',
                estado: '',
                longitud: '',
                latitud: '',
                est: false
            },
                state.total = 0;
        },
        onSetTotal: (state, { payload }) => {
            state.total = payload;
        }
    }
});

export const {
    onAddNewAlert,
    onViewAlert,
    onIsLoagingAlert,
    onLogoutAlert,
    onLoadAlerts,
    onSetTotal,
    onLoadAlertsScokets,
} = usalertSclice.actions;