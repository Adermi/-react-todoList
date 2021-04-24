import React, { Component } from 'react'
import './Footer.css'
import {Checkbox } from 'antd'

export default class Footer extends Component {
  render() {
    let {action, isAllDone, disable} = this.props
    let len = action.filter(item => {
      if(item.done) {
        return true
      }
      return false
    }).length || 0

    return (
      <div className="todo-list-footer">
        <Checkbox onChange={this.isAllDonChange} checked={isAllDone}  disabled={disable}>共完成{len}条</Checkbox>
      </div>
    )
  }

  isAllDonChange = e => {
    this.props.isAllDonChange()
  }
}
