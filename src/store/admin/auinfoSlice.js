import { createSlice } from '@reduxjs/toolkit';

export const auinfoSlice = createSlice({
    name: 'info',
    initialState: {
        isLoadingInfo: false,
        infos: [],
        infoActive: {
            Id: 0,
            datos: '',
            link: '',
            fecha: '',
            state: false,
        }
    },
    reducers: {
        onLoadInfo: (state, { payload = [] }) => {
            payload.forEach(usr => {
                const exists = state.infos.some(dbPro => dbPro.Id === usr.Id);
                if (!exists) {
                    state.infos.push(usr);
                }
            })
        },
        onAddNewInfo: (state, { payload = {} }) => {
            state.infos.push(payload);
        },
        onUpdateInfo: (state, { payload = {} }) => {
            state.infos = state.infos.map(cat => {
                if (cat.Id === payload.Id) {
                    return payload;
                }
                return cat;
            });
        },
        onViewInfo: (state, { payload }) => {
            state.infoActive = payload
        },
        onDeleteInfos: (state, { payload = 0 }) => {
            state.infos = state.infos.filter(cat => cat.Id !== payload);
        },
        onIsLoagingInfo: (state, { payload }) => {
            state.isLoadingInfo = payload
        },
        onLogoutInfo: (state) => {
            state.isLoadingInfo = false;
            state.infos = [];
            state.infoActive = {
                Id: 0,
                datos: '',
                link: '',
                fecha: '',
                state: false,
            }
        },
    }
});

export const {
    onAddNewInfo,
    onDeleteInfos,
    onLoadInfo,
    onLogoutInfo,
    onIsLoagingInfo,
    onViewInfo,
    onUpdateInfo,
} = auinfoSlice.actions;