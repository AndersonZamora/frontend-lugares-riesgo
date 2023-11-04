import { useAuthStore, useSocket } from '../hooks';
import { createContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAddNewAlert, onLoadAlerts, onTemId } from '../store';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:4000');
    const { user } = useAuthStore();

    const dispatch = useDispatch();

    useEffect(() => {
        if (user.logged) {
            conectarSocket();
        }

    }, [user, conectarSocket]);

    useEffect(() => {
        if (!user.logged) {
            desconectarSocket();
        }
    }, [user, desconectarSocket]);

    useEffect(() => {
        socket?.on('lista-alertas', (model) => {
            dispatch(onLoadAlerts(model));
        });

    }, [socket, dispatch]);

    useEffect(() => {
        socket?.on('new-alert', (model) => {
            dispatch(onAddNewAlert(model))
            dispatch(onTemId(model.Id))
        });

    }, [socket, dispatch]);

    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )
}
