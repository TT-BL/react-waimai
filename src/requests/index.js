import {_post,_get,_delete} from './ajax.js'
//管理员登录
export const adminLogin=(data)=>{
    const req={
        url:'admin/admin_login',
        data
    }
    return _post(req)
}
//获取餐馆信息
export const getRestaurant=()=>{
    const req={
        url:'/v1/my_restaurant'
    }
    return _get(req)
}
//获取全部食物
export const getFoods=()=>{
    const req={
        url:'/v1/my_foods'
    }
    return _get(req) 
}
//获取餐馆订单
export const getRestaurantOrders =()=>{
    const req={
        url:'/v1/my_restaurant_order'
    }
    return _get(req) 
}
//获取餐馆食品分类
export const getRestaurantCategory=()=>{
    const req={
        url:'/v1/my_category'
    }
    return _get(req)
}
//获取指定食品信息
export const getFood=(id)=>{
    const req={
        url:`/v1/foods/${id}`
    }
    return _get(req)
}
//添加商品
export const addFood=(data)=>{
    const req={
        url:'v1/food',
        data
    }
    return _post(req) 
}
//删除商品
export const deleteFood=(food_id)=>{
    const req={
        url:`v1/food/${food_id}`
    }
    return _delete(req)
}
//更新商品
export const updateFood=(data)=>{
    const req={
        url:'v1/update_foods',
        data
    }
    return _post(req) 
}
export const updateToken=()=>{
    const req={
        url:'/service/uploadtoken'
    }
    return _get(req) 
}
