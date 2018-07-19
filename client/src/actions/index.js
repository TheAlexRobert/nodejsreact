import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS} from './types';

//L75-76
export const fetchUser = () => async dispatch => {
        //action creator
        const res = await axios.get('/api/current_user'); //missing ;

        dispatch({ type: FETCH_USER, payload: res.data});
};

//L96
export const handleToken = (token) => async dispatch => {
        const res = await axios.post('/api/stripe', token);

        dispatch({ type: FETCH_USER, payload: res.data});
};

//163
export const submitSurvey = (values, history) => async dispatch => {
   const res = await axios.post('/api/surveys', values);

   history.push('/surveys');
   dispatch({ type: FETCH_USER, payload: res.data});
};
   
export const fetchSurveys = () => async dispatch => {
        const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data});    
}