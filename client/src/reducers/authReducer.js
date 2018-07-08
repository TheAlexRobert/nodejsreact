import { FETCH_USER } from '../actions/types';

//L78 - DETERMINES IF USER IS LOGGED IN
export default function(state = null, action){
    console.log(action);
    //L80 - decides whether logged in
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false; //action model - L80
        default:
            return state;
    }
}