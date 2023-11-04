import { Provider } from 'react-redux';
import { store } from './store';
import { HashRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { SocketProvider } from './context/SocketContext';

export const CitizenApp = () => {
    return (
        <Provider store={store}>
            <HashRouter>
                <SocketProvider>
                    <AppRouter />
                </SocketProvider>
            </HashRouter>
        </Provider>
    )
}
