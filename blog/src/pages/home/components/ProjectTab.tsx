import React from 'react'

import {  Empty } from 'antd'

class ContentTab extends React.Component {
  state = { size: 'small' }

  onChange = (e: any) => {
    this.setState({ size: e.target.value })
  }

  render() {
    return (
      <div>
        <Empty />
      </div>
    )
  }
}

export default ContentTab
