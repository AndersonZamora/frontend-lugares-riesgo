import { useDispatch, useSelector } from 'react-redux';
import { onActiveInfo, onSetStateAhut } from '../store';
import { useNavigate } from 'react-router-dom';

export const useUi = () => {

    const { authState, viewInfo } = useSelector(state => state.ui);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const startSate = (state = 'no-roguin-to-toroku/roguin/citizen') => {
        dispatch(onSetStateAhut(state));
        navigate('/login')
    }

    const startViewInfo = (state) => {
        dispatch(onActiveInfo(state));
    }

    return {
        authState,
        startSate,
        startViewInfo,
        viewInfo
    }
}