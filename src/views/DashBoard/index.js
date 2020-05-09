import React, { Component, createRef } from 'react'
import echarts from 'echarts'
import { getOrderFoodsCount } from '../../requests'
import { Card } from 'antd'
import { getRestaurantOrders } from '../../requests'

export default class DashBoard extends Component {
    constructor() {
        super()
        this.money = createRef()
    }
    moneyInit = () => {
        getRestaurantOrders().then(response => {
            if (response.data.status === 200) {
                const data = response.data.data
                let haspay = data.filter(value => value.status == '支付成功')
                const foodscount = new Map()
                haspay.forEach(value => {
                    value.foods.forEach(food=>{
                        if (foodscount.has(food.name)) {
                            let c = foodscount.get(food.name)
                            foodscount.set(food.name, c + 1)
                        }
                        else {
                            foodscount.set(food.name, 1)
                        }
                    })
                })
                let foodsArray = Array.from(foodscount)
                foodsArray.sort(function (a, b) {
                    return  b[1]-a[1] 
                })
                const topFood = foodsArray.slice(0, 5)
                this.setState({
                    topFoods:topFood
                })
            }
            this.createEcharts()
        })
    }
    createEcharts=()=>{
        var myChart = echarts.init(this.money.current)
        const foodsName=this.state.topFoods.map(value=>{
            return value[0]
        })
        const foodsCount=this.state.topFoods.map(value=>{
            return value[1]
        })
        var option = {
            title: {
                text: '销量前五商品'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: foodsName
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: foodsCount
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    componentDidMount() {
        this.moneyInit()
    }
    render() {
        return (
            <Card title='商品销售统计'>
                <div ref={this.money} style={{height:'400px'}}></div>
            </Card>
        )
    }
}
