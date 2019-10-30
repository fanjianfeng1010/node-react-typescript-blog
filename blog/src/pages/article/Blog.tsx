import React, { Component } from 'react'

import { Card, Divider, Icon, Tag, message, BackTop } from 'antd'
import ReactMarkdown from 'react-markdown'
import { getArticle } from '../../api/blog'
import { Blog } from '../../store/articles/types'
import { RouteComponentProps } from 'react-router-dom'

import './test.less'

interface Props {}
interface IState {
  data: Blog | null
  loading: boolean
}
type ComponentProps = Props & RouteComponentProps

class BlogContent extends Component<ComponentProps, IState> {
  constructor(props: ComponentProps) {
    super(props)
    this.state = {
      data: null,
      loading: true
    }
  }
  async componentDidMount() {
    if (this.state.data === null) {
      let id = this.props.location.pathname.split('g/')[1]
      let res = await getArticle(id, false)

      if (res.data) {
        this.setState({
          loading: false,
          data: res.data
        })
      } else {
        message.error('你好像来到一个没有知识的荒原了,立刻为你跳转到首页')
        setTimeout(() => {
          this.props.history.push('/home')
        }, 3000)
      }
    }
  }

  render() {
    if (this.state.data === null) return ''
    let { data } = this.state
    let { createdAt } = data
    createdAt = createdAt.split('T')[0]
    return (
      <div>
        <Card title={data.title} style={{ textAlign: 'center' }}>
          <BackTop />
          <div className="info">
            <Icon type="note" />
            {createdAt}
            <Divider type="vertical" />
            <Icon type="eye" style={{ marginRight: '5px' }} />
            {data.viewsCount}
            <Divider type="vertical" />
            <Icon type="tag" style={{ marginRight: '5px' }} />
            <Tag color="red">{data.category.name}</Tag>
            <Divider type="vertical" />
          </div>
          <Divider />
          <div className="markdown-wrapper">
            <ReactMarkdown source={data!.content} rawSourcePos={true} escapeHtml={false} />
          </div>
        </Card>
      </div>
    )
  }
}

export default BlogContent
