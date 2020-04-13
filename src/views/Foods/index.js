import React, { Component } from 'react'
import { Table, Button,Card} from 'antd';
import { getFoods } from '../../requests'

const columnTitle = {
    name: '食品名称',
    price: '价格',
    month_cales: '月售量',
    praise_num: '点赞数'
}
class Foods extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            columns: [],
            isLoading: false
        }
    }
    createColumns(columnsKeys) {
        let columns = columnsKeys.map(value => {
            return {
                title: columnTitle[value],
                dataIndex: value,
                key: value,
            }
        })
        columns.push({
            title: '操作',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, record, index) => {
                return (
                    <>
                        <Button size='small' type='primary'
                        >编辑</Button>
                        <Button size='small' type='danger'
                        >删除</Button>
                    </>
                )
            }
        })
        return columns
    }
    getData=() =>{
        this.setState({
            isLoading: true
        })
        getFoods().then(response => {
            if (response.data.status === 200) {
                response.data.data.forEach(value => {
                    const price = value.skus[0].price
                    value['price'] = price
                    delete value.skus
                })
                const columnsKeys = Object.keys(response.data.data[0])
                const columns = this.createColumns(columnsKeys)
                this.setState({
                    columns,
                    data: response.data.data,
                    isLoading: false
                })
            }
            else {
                console.log(response.data.message);
            }
        })
            .catch(err => {

            })
            .finally(() => {
                this.setState({
                    isLoading: false
                })
            })
    }
    componentDidMount() {
        this.getData()
    }
    render() {
        return (
            <Card title="食品列表" extra={<Button type='primary'>添加食物</Button>}>
                <Table columns={this.state.columns} dataSource={this.state.data} loading={this.state.isLoading} rowKey={record=>record.id}
                />
            </Card>
        )
    }
}
export default Foods
