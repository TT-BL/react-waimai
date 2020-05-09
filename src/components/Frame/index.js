import React, { Component } from 'react'
import { withRouter,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../actions/user'
import { Layout, Menu, Dropdown,Modal} from 'antd'
import { ExclamationCircleOutlined,DownOutlined} from '@ant-design/icons'
import './index.less'

const { Header, Content, Sider } = Layout;
const {confirm}=Modal

const mapState=(state)=>({
    name:state.retaurants.name,
    isLogin:state.users.isLogin
})
@withRouter
@connect(mapState,{logout})
class Frame extends Component {
    onMenuClick = ({ key }) => {
        if(key==='/login'){
            const that=this
            confirm({
                title: '确定退出登录吗',
                icon: <ExclamationCircleOutlined />,
                onOk() {
                    that.props.logout()
                },
                onCancel() {
                },
              });
        }
        else{
            this.props.history.push(key)
        }
    }
    render() {
       const username=localStorage.getItem('username')
       const menu = (
        <Menu onClick={this.onMenuClick}>
          <Menu.Item key="/admin/comments">用户评论</Menu.Item>
          <Menu.Item key="/admin/setting">设置</Menu.Item>
          <Menu.Divider />
          <Menu.Item key="/login">退出登录</Menu.Item>
        </Menu>
      );
        return (
            this.props.isLogin?
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    欢迎您，{username} <DownOutlined />
                    </a>
                    </Dropdown>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            selectedKeys={this.props.location.pathname}
                            // defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                            onClick={this.onMenuClick}
                        >
                            {this.props.route.map((route) => {
                                    return (
                                        <Menu.Item title={route.title} key={route.pathname}>{route.title}</Menu.Item>
                                    )
                            })}
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <div style={{ margin: '16px 0' }}>
                            {this.props.name}
                        </div>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                           {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout >:
             <Redirect to='/login'></Redirect>
        )
    }
}
export default Frame
