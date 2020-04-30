import React, { Component } from 'react'
import { Table, Button,Card,Modal} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { getFoods,deleteFood} from '../../requests'
const { confirm } = Modal

const columnTitle = {
    id:'id',
    name: '食品名称',
    price: '价格',
    month_saled: '月售量',
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
    delete=(record)=>{
        confirm({
            title: '确定删除该商品吗?',
            icon: <ExclamationCircleOutlined />,
            content: record.name,
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteFood(record.id).then(resp=>{
                    console.log(resp);
                    
                })
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
    edit=(record)=>{
        this.props.history.push(`/admin/foods/update/${record.id}`)
    }
    add=()=>{
        this.props.history.push('/admin/foods/add')
    }
    createColumns(columnsKeys) {
        let columns = columnsKeys.map(value => {
            if(value==='price'){
                return {
                    title: columnTitle[value],
                    dataIndex: value,
                    key: value,
                    align:'center',
                    render:(record)=>{
                        return '$'+record
                    }
                }
            }
            return {
                title: columnTitle[value],
                dataIndex: value,
                key: value,
                align:'center'
            }
        })
        columns.push({
            title: '操作',
            dataIndex: 'actions',
            key: 'actions',
            align:'center',
            render: (text, record, index) => {
                return (
                    <>
                        <Button size='small' type='primary'
                        onClick={this.edit.bind(this,record)}
                        >编辑</Button>
                        
                        <Button size='small' type='danger'
                        onClick={this.delete.bind(this,record)}
                        >删除</Button>
                    </>
                )
            }
        })
        return columns
    }
    getData=() =>{
        // console.log(this)
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
            <Card title="食品列表" extra={<Button type='primary' onClick={this.add.bind(this)}>添加食物</Button>}>
                <Table columns={this.state.columns} dataSource={this.state.data} loading={this.state.isLoading} rowKey={record=>record.id}
                />
            </Card>
        )
    }
}
export default Foods
