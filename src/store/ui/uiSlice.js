import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false,
        isDelete: false,
        isNotificationModel: false,
        authState: 'citizen',
        viewInfo: false,
    },
    reducers: {
        onOpenDateModal: (state) => {
            state.isDateModalOpen = true;
        },
        onCloseDateModal: (state) => {
            state.isDateModalOpen = false;
        },
        onOpenDelete: (state) => {
            state.isDelete = true;
        },
        onCloseDelete: (state) => {
            state.isDelete = false;
        },
        onActionModalNoti: (state, { payload }) => {
            state.isNotificationModel = payload;
        },
        onLogoutUi: (state) => {
            state.isDateModalOpen = false;
            state.isDelete = false;
            state.isNotificationModel = false;
            state.authState = 'citizen';
            state.viewInfo = false;
        },
        onSetStateAhut: (state, { payload }) => {
            state.authState = payload;
        },
        onActiveInfo: (state, { payload }) => {
            state.viewInfo = payload;
        }
    }
});

export const {
    onOpenDateModal,
    onCloseDateModal,
    onOpenDelete,
    onCloseDelete,
    onActionModalNoti,
    onLogoutUi,
    onSetStateAhut,
    onActiveInfo,
} = uiSlice.actions;
