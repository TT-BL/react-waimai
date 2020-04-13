import actionType from './actionTypes'
import {getMyfoods} from '../requests'
const startGetFoods=()=>{
    return{
        type:actionType.START_GET_FOODS
    }
}
const getFoodSuccess=(foodInfo)=>{
    return{
        type:actionType.LOGIN_SUCCESS,
        payload:foodInfo
    }
}
export const getFoods=()=>{
    return dispatch=>{
        dispatch(startGetFoods)
        getMyfoods().then(response=>{
            console.log(response)
            if(response.data.status=200){
                dispatch(getFoodSuccess(response.data.foods))
            }
            else{
                console.log(response.data.message);
            }
        })
    }
}