import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, Link } from 'react-router-dom'
import { Table, Button, Spin } from 'antd'
import { ColumnProps } from 'antd/lib/table'

//自己写的组件
import { ApplicationState } from '../../store/inex'
import { fetchRequest } from '../../store/articles/action'
import { batchDeleteArticle } from '../../api/blog'
import { Blog } from '../../store/articles/types'

type PropFromMap = {
  data: Blog[]
}
type PropFromDispatch = {
  fetchRequest: typeof fetchRequest
}

type IState = {
  articleIds: string[]
  deleteLoading: boolean
}
type ComponentProps = PropFromDispatch & RouteComponentProps & PropFromMap

class Admin extends Component<ComponentProps, IState> {
  // 第二步 展示数据
  // 展示数据的格式
  public columns: ColumnProps<Blog>[]
  constructor(props: ComponentProps) {
    super(props)
    this.state = {
      articleIds: [],
      deleteLoading: false
    }
    this.columns = [
      {
        title: 'title',
        dataIndex: '_id',
        key: '_id',
        render: (text: string, record: Blog) => (
          <Link to={`/blog/${record._id}`}>{record.title}</Link>
        )
      },
      {
        title: '种类',
        key: 'category._id',
        dataIndex: 'category.name'
      }
    ]
  }

  // 第一步加载数据
  async componentDidMount() {
    if (!this.props.data || this.props.data.length === 0) {
      await fetchRequest()
    }
  }

  // 第四步删除操作
  handleClick = async () => {
    this.setState({
      deleteLoading: true
    })
    // 删除指定的 ID
    if (this.state.articleIds && this.state.articleIds.length !== 0) {
      let res = await batchDeleteArticle(this.state.articleIds)
      /* 服务器返回数据格式
       * {
       *   deleteCount:number,
       *   n:number,
       *   ok:string
       * }
       */
      // 删除数据成功后更新状态
      if (res.data) {
        this.props.fetchRequest()
        this.setState({
          articleIds: [],
          deleteLoading: false
        })
      }
    }
  }

  render() {
    const rowSelection = {
      onChange: (selectedRowKeys: any, selectedRows: any) => {
        // 第三步,把选择的ID 添加到 状态中
        this.setState({
          articleIds: selectedRowKeys
        })
      }
    }

    return (
      <div>
        <Spin spinning={this.state.deleteLoading}>
          <Table
            rowSelection={rowSelection}
            columns={this.columns}
            dataSource={this.props.data}
            rowKey={(record) => {
              return record._id
            }}
          />
          <Button onClick={this.handleClick} loading={this.state.deleteLoading}>
            删除
          </Button>
        </Spin>
      </div>
    )
  }
}

const mapState = ({ blogs }: ApplicationState) => {
  return {
    data: blogs.data
  }
}

const mapDispatch = {
  fetchRequest
}

export default connect(
  mapState,
  mapDispatch
)(Admin)
