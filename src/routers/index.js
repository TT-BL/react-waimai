import {Login,NotFound,DashBoard,Setting,Foods,AddFood,UpdateFood,Comments} from '../views'
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
        isNav:true
    },
    {
        pathname:'/admin/foods',
        component:Foods,
        title:'商品管理',
        exact:true,
        isNav:true
    },
    {
        pathname:'/admin/foods/add',
        component:AddFood,
        title:'添加商品',
    },
    {
        pathname:'/admin/foods/update/:id',
        component:UpdateFood,
        title:'更新商品',
    },
    {
        pathname:'/admin/comments',
        component:Comments,
        title:'买家评论',
    },
    {
        pathname:'/admin/setting',
        component:Setting,
        title:'设置',
        isNav:true
    }
]