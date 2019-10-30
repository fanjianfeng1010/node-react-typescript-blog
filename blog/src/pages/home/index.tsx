import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Tabs } from 'antd'

// 自己写的组件
import ArticleList from './components/ArticleList'
import ProjectTab from './components/ProjectTab'
// style
import './style.less'
import { ApplicationState } from '../../store/inex'
import { Blog } from '../../store/articles/types'
import { RouteComponentProps } from 'react-router-dom'
const { TabPane } = Tabs

type PropFromMap = {
  data: Blog[]
}
type PropFromDispatch = {}
type ComponentProps = PropFromDispatch & PropFromMap & RouteComponentProps
class AppHome extends Component<ComponentProps> {
  render() {
    return (
      <Card>
        <Tabs defaultActiveKey="1" size={'large'} style={{ textAlign: 'left' }}>
          <TabPane tab="文章" key="1">
            <div className="card-body">
              {/* loading 效果要实现 */}
              <ArticleList />
            </div>
          </TabPane>
          <TabPane tab="项目" key="2">
            <ProjectTab />
          </TabPane>
        </Tabs>
      </Card>
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
  null
)(AppHome)
