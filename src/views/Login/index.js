import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../actions/user'

const mapState = (state) => ({
    isLogin: state.users.isLogin,
    isLoading: state.users.isLoading
})
@connect(mapState, { login })

class Login extends Component {
    onFinish = values => {
        this.props.login(values)
    };
    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 8 },
        };
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };
        return (
            this.props.isLogin ?
                <Redirect to='/admin'></Redirect> :
                <div style={{
                    width: '100%',
                    position: "absolute",
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)'
                }}>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
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
export default Login
