import React, { Component } from 'react'
import { Form, Input, InputNumber, Button, Card,Select,Upload,Spin,message } from 'antd';
import axios from 'axios'
import {getRestaurantCategory,updateToken,addFood} from '../../requests'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import './index.less'

const { Option } = Select;
export default class AddFood extends Component {
    constructor(){
        super()
        this.state={
            category:[],
            isPicLoading:false,
        }
    }
    getCategory=()=>{
        getRestaurantCategory().then(response=>{
            console.log(response);
            if(response.data.status===200){
                this.setState({
                    category:response.data.data
                })
            }
        })
    }
    handleUploadAvatar=({ file })=>{
        const data=new FormData()
        data.append('token',this.state.uploadtoken)
        data.append('file',file)
        this.setState({
            isPicLoading: true
        })
        axios.post('http://up-z2.qiniup.com',data).then(resp=>{
            if(resp.status===200){
                this.setState({
                    pic: 'http://q9cg6qfp9.bkt.clouddn.com/'+resp.data.key,
                    isPicLoading: false
                })
                // this.props.changeAvatar(resp.data.linkurl)
            }
            else{}
        })
        .catch()
    }
    getQinniuToken=()=>{
        updateToken().then(res=>{
            this.setState({uploadtoken:res.data.uptoken})
        })
    }
    componentDidMount(){
        this.getCategory()
        this.getQinniuToken()
    }
    finish=(values)=>{
        const category=this.state.category.find(value=>value.name===values.category)
        delete values.category
        delete values.foodPic
        const skus=[]
        const obj={
            price:values.min_price,
            description:values.description
        }
        skus.push(obj)
        const foodInfo={...values,category_id:category.id,pic_url:this.state.pic,skus}
        // console.log(foodInfo)
        addFood(foodInfo).then(resp=>{
            if(resp.data.status===200){
                message.success('添加成功')
                console.log(this.props);
                this.props.history.goBack()
            }
        })
    }
    render() {
        const uploadButton = (
            <div className='addImg'>
              {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div className="ant-upload-text">Upload</div>
            </div>
        )
        const validateMessages = {
            required: '${label} 是必须的',
            types: {
                number: '${label} 不是一个数字!',
            },
            number: {
                range: '${label} 必须在 ${min} 和 ${max}之间',
            },
        };
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };
        return (
            <Card title='增加商品'>
                <Form {...layout} name="nest-messages" validateMessages={validateMessages} onFinish={this.finish}>
                    <Form.Item name='category' label="分类种类" rules={[{ required: true }]}>
                        <Select style={{ width: 200 }}>
                            {
                                this.state.category.map(value=>{
                                    return (
                                        <Option value={value.name} key={value.id}>{value.name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name='food_name' label="食物名称" >
                        <Input />
                    </Form.Item>
                    <Form.Item name='min_price' label="价格" rules={[{ type: 'number', min: 0, max: 99 }]}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item name='description' label="商品描述">
                        <Input />
                    </Form.Item>
                    <Form.Item name='foodPic' label="上传图片">
                            <Upload showUploadList={false} 
                            customRequest={this.handleUploadAvatar}
                            className='avatar-uploader'
                            >
                                <Spin spinning={this.state.isPicLoading} >
                                {this.state.pic?<img src={this.state.pic} alt='头像'></img>:uploadButton}
                                </Spin>
                            </Upload>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
