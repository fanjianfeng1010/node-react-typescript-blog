import React from 'react'
import { Form, Icon, Input, Button, Checkbox, Modal, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { userLogin } from '../../../api/user'
import { encrypt } from '../../../utils/crypto-js'
import { APP_TOKEN_KEY } from '../../../config/default.config'
import { userLoginAction } from '../../../store/user/action'
import { connect } from 'react-redux'

interface IProps {
  visbleFromParent: boolean
  setingVisible: (arg: boolean) => any
}

interface PropFromDispatch {
  userLoginAction: typeof userLoginAction
}

type componentPorps = IProps & PropFromDispatch & FormComponentProps
interface IState {
  visble: boolean
}

class NormalLoginForm extends React.Component<componentPorps, IState> {
  constructor(props: componentPorps) {
    super(props)
    this.state = {
      visble: true
    }
  }

  handleSubmit = (e: any) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      // 校验数据输入合法后,把得到的结果转化为字符串并加密,使用 userLogin 方法把数据发送到服务器上
      // 如果服务器返回登录的数据不为 null,即登录成功,此时把把服务器发送回来的 token 保存在 localStorage 中

      if (!err) {
        let { account, password } = values

        let str = encrypt(JSON.stringify({ account, password }))
        let res = await userLogin({ key: str })

        if (res.data.token) {
          localStorage.setItem(APP_TOKEN_KEY, res.data.token)
          this.props.setingVisible(false)
          message.success('登录成功')
          this.props.userLoginAction()
        } else {
          message.error(res.data.msg)
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        visible={this.props.visbleFromParent}
        footer={null}
        onCancel={(ev) => {
          this.props.setingVisible(false)
        }}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('account', {
              rules: [{ required: true, message: 'Please input your username!' }]
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }]
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={this.handleSubmit}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

const WrappedNormalLoginForm = Form.create<componentPorps>()(NormalLoginForm)

export default connect(
  null,
  { userLoginAction }
)(WrappedNormalLoginForm)
