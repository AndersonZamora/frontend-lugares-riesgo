import { createSlice } from '@reduxjs/toolkit';

export const ausersSlice = createSlice({
    name: 'users',
    initialState: {
        isLoadingUsers: false,
        users: [
            // tempEvent
        ],
        userActive: {
            Id: 0,
            apellidos: '',
            celular: '',
            correo: '',
            nombres: '',
            state: false,
        }
    },
    reducers: {
        onLoadUsers: (state, { payload = [] }) => {
            payload.forEach(usr => {
                const exists = state.users.some(dbPro => dbPro.Id === usr.Id);
                if (!exists) {
                    state.users.push(usr);
                }
            })
        },
        onViewUser: (state, { payload }) => {
            state.userActive = payload
        },
        onDeleteUsers: (state, { payload = 0 }) => {
            state.users = state.users.filter(cat => cat.Id !== payload);
        },
        onIsLoagingUser: (state, { payload }) => {
            state.isLoadingUsers = payload
        },
        onLogoutUser: (state) => {
            state.isLoadingUsers = false;
            state.users = [];
            state.userActive = {
                Id: 0,
                apellidos: '',
                celular: '',
                correo: '',
                nombres: '',
                state: false,
            }
        },
    }
});

export const {
    onLoadUsers,
    onDeleteUsers,
    onLogoutUser,
    onIsLoagingUser,
    onViewUser,
} = ausersSlice.actions;