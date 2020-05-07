import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getCommentsCount,getComments} from '../../requests'
import { Card, List, Comment, Spin,Pagination} from 'antd'

const mapState=(state)=>({
    count:state.retaurants.count
})
@connect(mapState)
class Comments extends Component {
    constructor() {
        super()
        this.state = {
            comments: [],
            isLoad: false
        }
    }
    getData = (offset=0,limit=5) => {
        getComments({offset,limit}).then(resp => {
            this.setState ({
                isLoad: true
            })
            if (resp.data.status === 200) {
                this.setState({
                    comments: resp.data.data,
                    isLoad: false
                })
            }
        })
    }
    componentDidMount() {
        this.getData()
    }
    change(page){
        this.getData(page-1)
    }
    render() {
        // console.log(this.state.comments);
        return (
            <Card title="买家评论">
                <Spin spinning={this.state.isLoad}>
                    <List
                        className="comment-list"
                        header={`${this.state.comments.length} replies`}
                        itemLayout="horizontal"
                        dataSource={this.state.comments}
                        renderItem={item => (
                            <li>
                                <Comment
                                    author={item.user_name}
                                    avatar={item.avatar}
                                    content={item.comment_data}
                                />
                            </li>
                        )}
                    />
                    <Pagination defaultCurrent={1} total={this.props.count} showSizeChanger={false} onChange={this.change.bind(this)}/>
                </Spin>
            </Card>
        )
    }
}
export default Comments
