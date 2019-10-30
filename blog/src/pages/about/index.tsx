import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Card, Skeleton, Divider, Icon, Rate } from 'antd'

import './index.less'

type ComponentProps = RouteComponentProps
const About: React.FC<ComponentProps> = () => {
  return (
    <Skeleton loading={false}>
      <Card className="about-wrapper" style={{ height: '100vh' }}>
        <Divider orientation={'left'}>博客简述</Divider>
        <p>
          本博客是使用react + and + nestjs + mongo 实现的
          还有很多做得不好的地方,项目的成因是因为自学了那么久,都是看视频,没试过自己去实现项目,
          于是就想把自己学到东西实践一下,同时可以检测一下自己哪里还学得不够好,在项目中,发现了自己好多知识学习得不好,
          同时也进步了很多
        </p>
        <Divider orientation={'left'}>关于我</Divider>
        <ul>
          <li>姓名:范剑峰</li>
          <li>毕业院校:广东轻工职业技术学院</li>
          <li>学历专业:大专 | 软件技术</li>
          <li>
            联系方式:
            <Icon type="mail" />
            <a href="mailto:264589826@qq.com">264589826@qq.com</a>
            <Icon type="phone" /> 13416179124
          </li>
          <li>坐标:广州市</li>
          <li>
            技能
            <ul className="skill">
              <li>
                HTML、CSS、Javascript：能熟练开发符合 W3C 标准的页面！
                <Rate disabled defaultValue={3} />
              </li>
              <li>
                react ：熟练掌握使用！
                <Rate allowHalf disabled defaultValue={2.5} />
              </li>
              <li>
                es6：掌握基本面向对象编程实现！
                <Rate allowHalf disabled defaultValue={3} />
              </li>
              <li>
                typescript:日常使用 typescript 构建类型明确的应用
                <Rate allowHalf disabled defaultValue={3} />
              </li>
              <li>
                webpack: 入门级别，可以对脚手架进行针对性的配置！
                <Rate disabled defaultValue={2.5} />
              </li>
              <li>
                node mysql：针对需求可以做到简单的数据库设计、接口的开发与设计！
                <Rate allowHalf disabled defaultValue={2.5} />
              </li>
              <li>
                个人
                <ul>
                  <li>良好的代码习惯,规范注释</li>
                  <li>正在求职,欢迎交流</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </Card>
    </Skeleton>
  )
}

export default About
