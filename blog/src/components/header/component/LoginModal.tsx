import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import WrappedNormalLoginForm from './LoginForm'
import PersonOption from './PersonOption'
import { ApplicationState } from '../../../store/inex'
import { userLoginAction } from '../../../store/user/action'

type IState = {
  isFormVisble: boolean
}

type PromFromMap = {
  login: boolean
}
type PropFromDispath = {
  userLoginAction: typeof userLoginAction
}
type ComponentProps = PromFromMap & PropFromDispath

class LoginModal extends Component<ComponentProps, IState> {
  constructor(props: ComponentProps) {
    super(props)
    this.state = {
      isFormVisble: false
    }
  }

  handleFormVisable = (visable: boolean) => {
    this.setState({
      isFormVisble: !this.state.isFormVisble
    })
  }
  render() {
    return (
      <div className="login">
        {/* 如果当前用户是登录状态,那么在右上角显示用户可以进行的操作选项,
        否则就显示一个可以点击的按钮,点击按钮会生成一个模态框,用户可以用来进行登录操作 */}
        {this.props.login ? (
          <PersonOption />
        ) : (
          <Button
            icon="user"
            shape="circle"
            type="primary"
            onClick={(ev) => {
              this.setState({
                isFormVisble: true
              })
            }}></Button>
        )}
        <WrappedNormalLoginForm
          visbleFromParent={this.state.isFormVisble}
          setingVisible={(visble) => this.handleFormVisable(this.state.isFormVisble)}
        />
      </div>
    )
  }
}

const mapState = ({ user }: ApplicationState) => {
  return {
    login: user.login
  }
}
const mapDispatch = {
  userLoginAction
}

export default connect(
  mapState,
  mapDispatch
)(LoginModal)
