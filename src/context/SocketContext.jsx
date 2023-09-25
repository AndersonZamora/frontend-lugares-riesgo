import { useAuthStore, useSocket } from '../hooks';
import { createContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onLoadAlerts } from '../store';
// import addNotification from 'react-push-notification';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:4000');
    const { user } = useAuthStore();
    const dispatch = useDispatch();

    // const handlePush = () => {
    //     addNotification({
    //         title: 'Nueva alerta',
    //         subtitle: 'Revisa las alertas',
    //         message: 'Hay una alerta',
    //         theme: 'darkblue',
    //     });
    // }


    useEffect(() => {
        if (user.logged) {
            conectarSocket();
        }

    }, [user, conectarSocket]);

    useEffect(() => {
        socket?.on('citizen', (uid) => {
            console.log(uid);
        });

    }, [socket])

    useEffect(() => {
        if (!user.logged) {
            desconectarSocket();
        }
    }, [user, desconectarSocket]);


    // useEffect(() => {

    //     socket?.on('denuncia', (model) => {

    //     });

    // }, [socket]);


    useEffect(() => {

        socket?.on('lista-alertas', (model) => {
            dispatch(onLoadAlerts(model));
        });

    }, [socket, dispatch]);

    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )
}
