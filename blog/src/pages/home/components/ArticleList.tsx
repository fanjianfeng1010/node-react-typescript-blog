import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Icon, Avatar } from 'antd'
import { ApplicationState } from '../../../store/inex'
import { Blog } from '../../../store/articles/types'
import QueueAnim from 'rc-queue-anim'
import { Link } from 'react-router-dom'

interface IconProps {
  type: string
  text?: number
}
const IconText = ({ type, text }: IconProps) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)

interface PropsFromMap {
  data: Blog[]
}
type ComponentProps = PropsFromMap

class ArticleList extends Component<ComponentProps> {
  render() {
    return (
      <div>
        {/* 服务器返回数据是按时间排序的,排在前面的数据是最早建立的,最后的数据时最新
           建立的,为了更好的阅读体验,需要把最新的数据放在最前面
        */}
        <List
          itemLayout="vertical"
          size="large"
          dataSource={this.props.data.reverse()}
          pagination={{
            onChange: (page) => {},
            pageSize: 3
          }}
          footer={
            <div>
              <b>呀,一不小心就拉到末尾了</b>
            </div>
          }
          renderItem={(item: Blog) => (
            <QueueAnim delay={1000} className="queue-simple">
              <List.Item
                key={item.title}
                actions={[
                  <IconText type="eye-o" text={item.viewsCount} key="list-vertical-star-o" />,
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
