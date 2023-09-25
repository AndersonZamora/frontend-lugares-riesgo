import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, authSlice, ausersSlice, auserenesSlice, auemergencySlice, auplacesSlice, auinfoSlice, usalertSclice } from './';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        ausers: ausersSlice.reducer,
        auserenes: auserenesSlice.reducer,
        augency: auemergencySlice.reducer,
        auplace: auplacesSlice.reducer,
        auinfo: auinfoSlice.reducer,
        usalert: usalertSclice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
