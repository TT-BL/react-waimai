import {Login,NotFound,DashBoard,Setting,Foods} from '../views'
import {AddFood,DeleteFood,UpdateFood} from '../views/FoodAdmin'
export const mainRouter=[
    {
        pathname:'/login',
        component:Login
    },
    {
        pathname:'/404',
        component:NotFound
    }
]
export const adminRouter=[
    {
        pathname:'/admin/dashboard',
        component:DashBoard,
        title:'仪表盘',
    },
    {
        pathname:'/admin/foods',
        component:Foods,
        title:'商品管理',
        routes:[
            {
                pathname:'/admin/foods/add',
                component:AddFood,
                title:'添加商品',
            },
            {
                pathname:'/admin/foods/delete',
                component:DeleteFood,
                title:'删除商品',
            },
            {
                pathname:'/admin/foods/update',
                component:UpdateFood,
                title:'更新商品',
            },
        ]
    },
    {
        pathname:'/admin/setting',
        component:Setting,
        title:'设置',
        
    }
]