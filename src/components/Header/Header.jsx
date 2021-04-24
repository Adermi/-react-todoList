import React, { Component } from 'react'
import { Input } from 'antd'

export default class Body extends Component {
  state = {
    value: ''
  }

  render() {
    return (
      <div>
        <Input placeholder="请输入目标" onPressEnter={this.pressEnter} onChange={this.change} value={this.state.value} />
      </div>
    )
  }

  // 用户输入内容回车
  pressEnter = e => {
    if(e.target.value === '') {
      return
    }

    // 把数据传入父组件
    this.props.getInputData(e.target.value, e.target)
    this.setState({
      value: ''
    })
  }

  change = e => {
    this.setState({
      value: e.target.value
    })
  }
}
