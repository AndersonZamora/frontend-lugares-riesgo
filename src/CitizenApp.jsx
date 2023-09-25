import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { SocketProvider } from './context/SocketContext';

export const CitizenApp = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <SocketProvider>
                    <AppRouter />
                </SocketProvider>
            </BrowserRouter>
        </Provider>
    )
}
