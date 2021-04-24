import React, { Component } from 'react';
import 'antd/dist/antd.css'
import './App.css'
import { Header, Body, Footer } from './components/index'

export default class App extends Component {
  state = {
    id: 1,
    action: [],
    isAllDone: false
  }

  render() {
    let { action, isAllDone } = this.state,
      disable = false

    if (!action.length) {
      disable = true
    }

    return (
      <div id="todo-list">
        <Header getInputData={this.getInputData} ></Header>
        <Body data={action} delete={this.delete} change={this.change} reWrite={this.reWrite} updateContext={this.updateContext}></Body>
        <Footer action={action} isAllDone={isAllDone} isAllDonChange={this.isAllDonChange} disable={disable}></Footer>
      </div>
    )
  }

  getInputData = (content) => {
    let { id, action } = this.state,
      newAction = [...action, {
        id: id, 
        name: content, 
        done: false,
        isReWrite: false
      }]

    this.handleAllTaskDone(newAction, { id: this.state.id + 1 })

  }

  delete = (id) => {
    // 把新的Action传入处理函数
    this.handleAllTaskDone(this.state.action.filter(item => {
      if (item.id === id) {
        return false
      }
      return true
    }))
  }

  // 用户点击任务完成
  change = id => {
    this.handleAllTaskDone(this.state.action.map(item => {
      if (item.id === id) {
        item.done = !item.done
      }
      return item
    }))
  }

  isAllDonChange = (...args) => {
    let { action, isAllDone } = this.state

    this.setState({
      isAllDone: !isAllDone,
      action: action.map(item => {
        item.done = !isAllDone
        return item
      })
    })
  }

  reWrite = id => {
    let {action}  = this.state
    this.setState({
      action: action.map(item => {
        if(item.id === id) {
          item.isReWrite = !item.isReWrite
        } 
        return item
      })
    })
  }

  updateContext = (value, id) => {
    let {action} = this.state
    this.setState({
      action: action.map(item => {
        if(item.id === id) {
          item.name = value
        }
        return item
      })
    })
  }

  // 是否所有任务都已经完成
  handleAllTaskDone = (actionUpdate, state = {}) => {
    let { isAllDone } = this.state,
      doneTaskLen = actionUpdate.filter(item => {
        if (item.done) {
          return true
        }
        return false
      }).length,
      actionUpdLen = actionUpdate.length

    if (actionUpdate.length === 0) {
      isAllDone = false
    } else {
      isAllDone = doneTaskLen === actionUpdLen ? true : false
    }

    this.setState({
      action: actionUpdate,
      isAllDone: isAllDone,
      ...state
    })
  }
}