import axios from 'axios';
import { FETCH_USER } from './types';

//L75-76
export const fetchUser = () => async dispatch => {
        //action creator
        const res = await axios.get('/api/current_user'); //missing ;

        dispatch({ type: FETCH_USER, payload: res.data});
};
   
