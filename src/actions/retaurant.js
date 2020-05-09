import actionType from './actionTypes'
import {getRestaurant,getCommentsCount} from '../requests'
const startGetRetaurant=()=>{
    return{
        type:actionType.START_GET_RESTAURANT
    }
}
const getRestaurantSuccess=(foodInfo)=>{
    return{
        type:actionType.GET_RESTAURANT_SUCCESS,
        payload:foodInfo
    }
}
export const getRetaurant=()=>{
    return dispatch=>{
        dispatch(startGetRetaurant)
        getRestaurant().then(response=>{
            if(response.data.status=200){
                getCommentsCount({restaurant_id:response.data.data.id}).then(resp=>{
                    if(resp.data.status===200){
                        dispatch(getRestaurantSuccess({...response.data.data,count:resp.data.data}))
                    }
                })
            }
            else{
                console.log(response.data.message);
            }
        })
    }
}