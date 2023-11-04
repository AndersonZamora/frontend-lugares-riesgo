import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        loadindAuth: false,
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
        onCheckingAuht: (state, { payload }) => {
            state.loadindAuth = payload;
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state) => {
            state.loadindAuth = false;
            state.status = 'not-authenticated';
            state.user = { logged: false };
            state.errorMessage = undefined;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        }
    }
});

export const { onChecking, onLogin, onLogout, clearErrorMessage, onCheckingAuht } = authSlice.actions;