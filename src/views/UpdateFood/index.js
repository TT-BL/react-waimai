import React, { Component } from 'react'
import { getFood,updateToken,updateFood } from '../../requests'
import axios from 'axios'
import { Form, Input, InputNumber, Button, Card, Spin,Upload,message} from 'antd';
import './index.less'

export default class UpdateFood extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            price: 0,
            description: '空',
            pic: '',
            isLoading: true,
            isPicLoading:false,
            uploadtoken:''
        }
    }
    getFoodInfo=()=>{
        getFood(this.props.match.params.id).then(response => {
            if (response.data.status === 200) {
                const data = response.data.data
                if(data.skus[0].description!==''){
                    this.setState({
                        description: data.skus[0].description
                    })
                }
                this.setState({
                    name: data.name,
                    price: Number(data.skus[0].price),
                    pic: data.pic_url,
                    isLoading: false
                })
            }
        })
    }
    handleUploadAvatar=({ file })=>{
        console.log(this.state.uploadtoken)
        console.log(file)
        const data=new FormData()
        data.append('token',this.state.uploadtoken)
        data.append('file',file)
        this.setState({
            isPicLoading: true
        })
        axios.post('http://up-z2.qiniup.com',data).then(resp=>{
            if(resp.status===200){
                console.log(resp);
                
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
    componentDidMount() {
        this.getFoodInfo()
        this.getQinniuToken()
    }
    onFinish=(values)=>{
        delete values.pic
        const foods_id=Number(this.props.match.params.id)
        // console.log(food_id);
        const foodInfo={...values,foods_id,pic_url:this.state.pic}
        console.log(foodInfo);
        updateFood(foodInfo).then(resp=>{
            console.log(resp)
            if(resp.data.status===200){
                message.success('修改成功')
                this.props.history.goBack()
            }
        })
    }
    render() {
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
            <div className='update'>
                <Card title='更新商品'>
                    {this.state.isLoading ?
                        <Spin tip="Loading..." ></Spin>
                        : <Form {...layout} name="nest-messages" 
                        onFinish={this.onFinish}
                        validateMessages={validateMessages} initialValues={{
                            'name': this.state.name,
                            'description': this.state.description,
                             price: this.state.price,
                        }}>
                            <Form.Item name='name'
                                label="食物名称" >
                                <Input />
                            </Form.Item>
                            <Form.Item name='price'
                                label="价格" rules={[{ type: 'number', min: 0
                                }]}>
                                <InputNumber />
                            </Form.Item>
                            <Form.Item name='description' label="商品描述">
                                <Input />
                            </Form.Item>
                            <Form.Item name='pic' label="上传图片">
                            <Upload showUploadList={false} 
                           customRequest={this.handleUploadAvatar}
                            >
                            <Spin spinning={this.state.isPicLoading} >
                                <img src={this.state.pic} alt='头像'></img> 
                            </Spin>
                            </Upload>
                             </Form.Item>
                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                                <Button type="primary" htmlType="submit">
                                    提交
                                </Button>
                            </Form.Item>
                        </Form>

                    }

                </Card>

            </div>
        )
    }
}
