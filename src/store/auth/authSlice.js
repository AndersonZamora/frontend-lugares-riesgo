import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        user: {
            logged: false
        },
        errorMessage: undefined,
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = { logged: false };
            state.errorMessage = undefined;
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state) => {
            state.status = 'not-authenticated';
            state.user = { logged: false };
            state.errorMessage = undefined;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        }
    }
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;