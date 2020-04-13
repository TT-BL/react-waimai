import React, { Component } from 'react'
import { withRouter} from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd'
import './index.less'

const { Header, Content, Sider } = Layout;

@withRouter
class Frame extends Component {
    onMenuClick = ({ key }) => {
        // console.log(key)
        this.props.history.push(key)
    }
    render() {

        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
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
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
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
            </Layout >
        )
    }
}
export default Frame
