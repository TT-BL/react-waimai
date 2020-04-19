import React, { Component,createRef} from 'react'
import echarts from 'echarts'
import {Card} from 'antd'
import {getRestaurantOrders} from '../../requests'

export default class DashBoard extends Component {
    constructor(){
        super()
        this.money=createRef()
    }
    moneyInit=()=>{
        getRestaurantOrders().then(response=>{
            console.log(response);
        })
    }
    componentDidMount(){
        // this.moneyInit()
    }
    render() {
        return (
            <Card title='商品销售统计'>

            </Card>
        )
    }
}
