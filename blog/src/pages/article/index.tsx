import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Skeleton, Card, Tag, Divider, List, Avatar } from 'antd'

// css
import './index.less'
import { ApplicationState } from '../../store/inex'
import { Blog } from '../../store/articles/types'
import { fetchRequest } from '../../store/articles/action'

interface IState {
  isLoading: boolean
  show: boolean
}
type PropFromMap = {
  data: Blog[]
}
type PropFromDispatch = {
  fetchRequest: typeof fetchRequest
}
type ComponentProps = PropFromDispatch & RouteComponentProps & PropFromMap

class Article extends Component<ComponentProps, IState> {
  constructor(props: ComponentProps) {
    super(props)
    this.state = {
      isLoading: true,
      show: false
    }
  }

  async componentDidMount() {
    if (!this.props.data || this.props.data.length !== 0) {
      await fetchRequest()
    }

    this.setState({
      show: true,
      isLoading: false
    })
  }

  render() {
    if (!this.props.data || this.props.data.length === 0) {
      return <Skeleton></Skeleton>
    }
    const { data } = this.props

    return (
      <Skeleton loading={this.state.isLoading}>
        <Card className="articleWrapper">
          <div className="category">
            <Tag color="magenta">javascrpt</Tag>
            <List
              itemLayout="horizontal"
              dataSource={data.filter((item) => item.category.name === 'javascript')}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://i.loli.net/2019/10/27/Zo46FpD53HmPC9Q.jpg" />}
                    title={<Link to={`/blog/${item._id}`}>{item.title}</Link>}
                    description={item.summary}
                  />
                </List.Item>
              )}
            />
          </div>
          <Divider />
          <div className="category">
            <Tag color="orange">css</Tag>
            <List
              itemLayout="horizontal"
              dataSource={data.filter((item: Blog) => item.category.name === 'css')}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://i.loli.net/2019/10/27/Zo46FpD53HmPC9Q.jpg" />}
                    title={<Link to={`/blog/${item._id}`}>{item.title}</Link>}
                    description={item.summary}
                  />
                </List.Item>
              )}
            />
          </div>
          <Divider />
          <div className="category">
            <Tag color="orange">随笔</Tag>
            <List
              itemLayout="horizontal"
              dataSource={data.filter((item: Blog) => item.category.name === 'note')}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://i.loli.net/2019/10/27/Zo46FpD53HmPC9Q.jpg" />}
                    title={<Link to={`/blog/${item._id}`}>{item.title}</Link>}
                    description={item.summary}
                  />
                </List.Item>
              )}
            />
          </div>
          <Divider />
        </Card>
      </Skeleton>
    )
  }
}

const mapState = ({ blogs }: ApplicationState) => {
  return {
    data: blogs.data
  }
}

export default connect(
  mapState,
  {}
)(Article)
