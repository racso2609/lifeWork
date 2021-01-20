import Axios from "axios"

import * as ActionType from './ActionType';
import {Url} from '../shared/DbUrl';


//raison
export const fetchRaisons = ()=>async (dispatch)=>{

    dispatch(loadingRaison(true));
   try {
       const res = await Axios.get(Url + "reason");
      
       dispatch(addRaison(res.data));


   } catch (error) {
       dispatch(raisonFailure(error.message));

   }
   
}
export const postRaison = (title, img, raison)=> async(dispatch)=>{
    try {
        const data = new FormData()
        data.append("image", img[0])
        data.append("raison", raison)
        data.append("title", title)

        const res = await Axios.post(Url + "reason",data);
        dispatch(addRaison(res.data));
    } catch (error) {   
        console.log(error);
        dispatch(raisonFailure(error.message));
    }
}
export const deleteRaisons = ()=> async (dispatch)=>{
    dispatch(loadingRaison(true));
    try {
        const res = await Axios.delete(Url + "reason")
        dispatch(addRaison(res.data));
    } catch (error) {
        dispatch(raisonFailure(error.message));
    }
}
export const deleteRaison = (id) => async(dispatch) => {
    try {
        const res = await Axios.delete(Url +"reason/"+ id);
        dispatch(addRaison(res.data))     
    } catch (error) {
        dispatch(raisonFailure(error.message));
    }
   
}
export const loadingRaison = () => ({
    type: ActionType.RAISON_LOADING
})
export const raisonFailure= (errMess)=>({
    type: ActionType.RAISON_FAILURE,
    payload: errMess
});
export const addRaison =(raisons)=>({
    type: ActionType.ADD_RAISON,
    payload: raisons
});

