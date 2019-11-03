import React from 'react'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { Row, Col } from 'antd'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

// 自己写的组件
import AppHeader from './components/header'
import AppSider from './components/sider'
import AppHome from './pages/home'
import Article from './pages/article'
import About from './pages/about'
import BlogContent from './pages/article/Blog'
import BlogEditor from './pages/article/BlogEditor'
import Admin from './pages/admin/Admin'

import './index.less'

const Routes: React.SFC = () => {
  let location = useLocation()
  return (
    <div>
      <Row>
        <Col sm={24} xs={24} md={24} lg={24} xl={24}>
          <AppHeader />
        </Col>
      </Row>
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={600}>
          <Row>
            <Col sm={0} xs={0} md={0} lg={8} xl={8}>
              <AppSider />
            </Col>

            <Col sm={24} xs={24} md={24} lg={16} xl={16}>
              <Switch location={location}>
                <Route path="/home" component={AppHome} />
                <Route path="/article" component={Article} />
                <Route path="/about" component={About} />
                <Route path="/blog" component={BlogContent} />
                <Route path="/editor" component={BlogEditor} />
                <Route path="/admin" component={Admin} />
                <Redirect from="/" to="/home" />
              </Switch>
            </Col>
          </Row>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}

export default Routes
