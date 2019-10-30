import React, { useState, useEffect } from 'react'

import { Card, Icon, Divider, Skeleton } from 'antd'
// import { RouteComponentProps } from 'react-router-dom'

import { Blog } from '../../store/articles/types'
import { getRencent } from '../../api/blog'
import './style.less'

// 这个模块主要是侧栏,没有太多需要与用户交户的操作,所以使用函数组件,需要从服务器获取一次数据,
// 使用了 hook effect
const AppSilder: React.FC<any> = () => {
  const [rencent, setRencent] = useState<Blog[]>([])
  useEffect(() => {
    ;(async function anyfunction() {
      let res = await getRencent()
      setRencent(res.data.items)
    })()
  }, [])
  return (
    <Card bordered={true} style={{ width: '100%' }}>
      <div className="account">
        <img
          src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
          alt=""
        />
        <div className="account-name">范剑峰</div>
        <div>小小的天有大大的梦想</div>
      </div>
      <div className="account-detail">
        <p>
          <Icon type="tag" /> 前端程序员
        </p>
        <p>
          <Icon type="contacts" /> 广东,广州
        </p>
      </div>

      <Divider />
      <div className="tag" style={{ textAlign: 'left' }}>
        <div className="tag-title">标签</div>
        <span className="tag-content">认真</span>
      </div>
      {/* 从服务器接口返回数据加载 */}
      <Divider />

      <div className="recent-article" style={{ textAlign: 'left' }}>
        <div className="rencent-article-title">最新文章</div>
      </div>
      {rencent.length !== 0 ? (
        rencent.map((item) => (
          <p key={item._id} className="rencent-article-content">
            {item.title}
          </p>
        ))
      ) : (
        <Skeleton />
      )}
    </Card>
  )
}

export default AppSilder
