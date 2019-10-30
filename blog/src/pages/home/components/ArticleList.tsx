import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Icon, Avatar } from 'antd'
import { ApplicationState } from '../../../store/inex'
import { Blog } from '../../../store/articles/types'
import QueueAnim from 'rc-queue-anim'
import { Link } from 'react-router-dom'

const IconText = ({ type, text }: any) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)

interface OwnProps {}
interface PropsFromMap {
  data: Blog[]
}
type ComponentProps = PropsFromMap & OwnProps

class ArticleList extends Component<ComponentProps> {
  render() {
    return (
      <div>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={this.props.data}
          pagination={{
            onChange: (page) => {},
            pageSize: 3
          }}
          footer={
            <div>
              <b>呀,一不小心就拉倒末尾了</b>
            </div>
          }
          renderItem={(item: Blog) => (
            <QueueAnim delay={1000} className="queue-simple">
              <List.Item
                key={item.title}
                actions={[
                  <IconText type="star-o" text={item.viewsCount} key="list-vertical-star-o" />,
                  <IconText type="like-o" text={item.likeCount} key="list-vertical-like-o" />,
                  <IconText type="message" text={item.commentCount} key="list-vertical-message" />
                ]}
                extra={
                  <img
                    width={272}
                    alt="logo"
                    src={item.imgUrl ? item.imgUrl : 'https://s2.ax1x.com/2019/10/30/Kf4t41.png'}
                  />
                }>
                <List.Item.Meta
                  avatar={<Avatar src="https://s2.ax1x.com/2019/10/30/Kf5zSP.jpg" />}
                  title={<Link to={`/blog/${item._id}`}>{item.title}</Link>}
                  description={item.summary}
                />
                {item.content}
              </List.Item>
            </QueueAnim>
          )}
        />
      </div>
    )
  }
}
const mapState = ({ blogs }: ApplicationState) => {
  let data = blogs.data
  return { data }
}

const mapDispatch = {}
export default connect(
  mapState,
  mapDispatch
)(ArticleList)
