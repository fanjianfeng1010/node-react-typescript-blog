import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ApplicationState } from '../../store/inex'
import { Menu, Icon } from 'antd'
import { fetchRequest } from '../../store/articles/action'
import { fetchRequest as fetchCategory } from '../../store/category/action'

// 自己写的组件
import { Blog } from '../../store/articles/types'
import LoginModal from './component/LoginModal'

// css
import './styles.less'
import { Category } from '../../store/category/types'

type headerState = {
  current: string
}
type PropFromMap = {
  data: Blog[]
  login: boolean
  category: Category[]
}
type PropFromDispatch = {
  fetchRequest: typeof fetchRequest
  fetchCategory: typeof fetchCategory
}
type ComponentProps = PropFromDispatch & PropFromMap

class AppHeader extends Component<ComponentProps, headerState> {
  constructor(props: ComponentProps) {
    super(props)
    this.state = {
      current: 'home'
    }
  }

  // 在进入主页时,从服务器中加载数据,并且把文章数据放进 redux 中,因为头部组件是多个页面共享的组件
  // 所以在头部组件发送请求获取数据.

  async componentDidMount() {
    // 如果组件已经有数据了,就不必再发送请求了
    if (!this.props.data || this.props.data.length === 0) {
      await this.props.fetchRequest()
    }
    if (!this.props.category || this.props.category.length === 0) {
      await this.props.fetchCategory()
    }
  }

  render() {
    return (
      <div className="header-wrapper">
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
          <Menu.Item key="home">
            <Link to="/home">
              <Icon type="home" />
              首页
            </Link>
          </Menu.Item>
          <Menu.Item key="article">
            <Link to="/article">
              <Icon type="profile" />
              文章
            </Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link to="/about">
              <Icon type="user" />
              关于
            </Link>
          </Menu.Item>
        </Menu>
        <LoginModal />
      </div>
    )
  }

  // 设置点击不同组件时 active 效果
  handleClick = (e: any) => {
    this.setState({
      current: e.key
    })
  }
}

// 把 redux 容器的中数据挂载到组件的 props 上
const mapState = ({ blogs, user, category }: ApplicationState) => {
  return {
    data: blogs.data,
    login: user.login,
    category: category.data
  }
}

const mapDispatch = {
  fetchRequest,
  fetchCategory
}

export default connect(
  mapState,
  mapDispatch
)(AppHeader)
