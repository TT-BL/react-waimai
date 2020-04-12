import actionType from './actionTypes'
import {adminLogin} from '../requests'
const StartLogin=()=>{
    return {
        type:actionType.START_LOGIN
    }
}
const LoginSuccess=(userInfo)=>{
    return {
        type:actionType.LOGIN_SUCCESS,
        payload:{
            userInfo
        }
    }
}
export const login=(userInfo)=>{
    return dispatch=>{
        dispatch(StartLogin())
        adminLogin(userInfo).then(response=>{
            console.log(response);
            if(response.data.status===200){
                localStorage.setItem('username',response.data.username)   
                dispatch(LoginSuccess({username:response.data.username,avatar:response.data.avatar})  )  
            }
            else{
                console.log(response.data.message) 
            }
        })
    }
}