import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { Form, Button, Icon, Input, Select, message } from 'antd'
import Editor from 'for-editor'
import { FormComponentProps } from 'antd/lib/form'
import { createArticle } from '../../api/blog'
import { ApplicationState } from '../../store/inex'
import { fetchRequest as fetchCategory } from '../../store/category/action'
import { Category } from '../../store/category/types'

type PropFromMap = {
  category: Category[]
}

type PropFromDispatch = {
  fetchCategory: typeof fetchCategory
}

type ComponentProps = RouteComponentProps & FormComponentProps & PropFromMap & PropFromDispatch
interface EditorState {
  value: string
  data: string
}

const { Option } = Select

class BlogEditor extends Component<ComponentProps, EditorState> {
  constructor(props: ComponentProps) {
    super(props)
    this.state = {
      data: '',
      value: ''
    }
  }

  async componentDidMount() {
    if (!this.props.category || this.props.category.length === 0) {
      await this.props.fetchCategory
    }
  }

  handleChange = (value: string) => {
    this.setState({
      value
    })
  }

  handleSubmit = (e: any) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // 这里添加对 summary 的处理,把 contnet的一部分内容截取成为 summary 的一部分,方便渲染
        let { title, content, category } = values,
          summary = content.substr(0, 30)
        // 传递信息给服务器
        let data = { title, content, summary, category }
        let res = await createArticle(data)
        if (res && res.data) {
          const articleId = res.data._id
          message.success('发表成功,即将为你跳转到详情页')
          setTimeout(() => {
            this.props.history.push(`/blog/${articleId}`)
          }, 2000)
        }
      }
    })
  }

  render() {
    // 如果种类不存在,则返回空
    // if (!this.props.category || this.props.category.length === 0) return ''
    const { category } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item hasFeedback>
          {getFieldDecorator('category', {
            rules: [{ required: true, message: '请选择文章种类' }]
          })(
            <Select placeholder="请选择文章种类">
              {category.map((item) => (
                <Option value={item._id}>{item.name}</Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入文章标题!' }]
          })(
            <Input
              prefix={<Icon type="pen" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="title"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('content', {
            rules: [{ required: true, message: '请开始你的大作' }]
          })(
            <Editor
              EditorValue={this.state.value}
              onChange={this.handleChange}
              onSave={(ev: any) => {
                this.setState({
                  data: ev
                })
              }}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            发表文章
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(BlogEditor)

const mapState = ({ category }: ApplicationState) => {
  return {
    category: category.data
  }
}

const mapDispatch = {
  fetchCategory
}

export default connect(
  mapState,
  mapDispatch
)(WrappedDynamicFieldSet)
