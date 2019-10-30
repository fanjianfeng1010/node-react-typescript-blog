import React, { Component } from 'react'
import { Menu, Dropdown, Icon, Button, message } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { APP_TOKEN_KEY } from '../../../config/default.config'
import { userLogoutAction } from '../../../store/user/action'

type ComponentProps = {
  userLogoutAction: typeof userLogoutAction
}

class PersonOption extends Component<ComponentProps> {
  menu = (
    <Menu>
      <Menu.Item>
        <Link to="/editor">写文章</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/admin">管理</Link>
      </Menu.Item>
      <Menu.Item>
        <Button
          type="link"
          onClick={(ev: any) => {
            localStorage.removeItem(APP_TOKEN_KEY)
            this.props.userLogoutAction()
            message.success('祝你生活愉快')
          }}>
          退出登录
        </Button>
      </Menu.Item>
    </Menu>
  )
  render() {
    return (
      <div>
        <Dropdown overlay={this.menu} trigger={['click']}>
          <Link to="/">
            <Icon type="down" />
            博客管理
          </Link>
        </Dropdown>
      </div>
    )
  }
}

export default connect(
  null,
  { userLogoutAction }
)(PersonOption)
