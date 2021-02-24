import * as ActionType from './ActionType';

export const Raison = (state = {isLoading: true, errMess: null, raisons: []}, action)=>{
    switch (action.type) {
        case 
        ActionType.ADD_RAISON:{
            return {...state, errMess: null, raisons: action.payload, isLoading: false, adding: null};
        }
        case 
        ActionType.RAISON_LOADING:
            
            return {...state, errMess: null, raisons: [], isLoading: true, adding:null};
        case
        ActionType.RAISON_FAILURE:
            return {...state, errMess: action.payload, raisons: [], isLoading: false, adding:null}
        case
        ActionType.POST_RAISON:
            return{...state, errMess: null, raisons: [], isLoading: false, adding: "Rasion added"}

        default:
            return state;
    }
}