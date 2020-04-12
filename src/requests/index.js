import {_post,_get} from './ajax.js'
export const adminLogin=(data)=>{
    const req={
        url:'admin/admin_login',
        data
    }
    return _post(req)
}
export const getRestaurantOrders=()=>{
    const req={
        url:'/v1/my_restaurant'
    }
    return _get(req)
}
