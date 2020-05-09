import React, { Component } from 'react'
import { Form, Input, Button,message} from 'antd';
import { updatePassword } from '../../requests'

export default class Setting extends Component {
    onFinish = (value) => {
        console.log(value)
        updatePassword({password:value.password}).then(resp => {
           if(resp.data.status===200){
            message.success('修改密码成功')
           }
        })
    }
    render() {
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 16 },
        };
        const tailLayout = {
            wrapperCol: { offset: 4, span: 16 },
        };
        return (
            <div>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                >

                    <Form.Item
                        name="password"
                        label="新密码"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="确认密码"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请确认密码',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('和您输入的密码不一致');
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Login
                            </Button>
                    </Form.Item>
                </Form>

            </div>
        )
    }
}
