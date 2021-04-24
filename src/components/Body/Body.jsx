import React, { Component } from 'react'
import { Divider, Checkbox, Button, Input } from 'antd';
import './Body.css'

export default class Footer extends Component {
  constructor(props) {
    super(props)
    this.bodyIpt = React.createRef()
  }

  render() {
    let { data: action } = this.props

    return (
      <div className="todo-list-body">
        {
          action.map((item, index) => {
            return (
              <section key={item.id}>
                <div className="item">
                  {item.isReWrite ? <Input className="rewrite-ipt" ref={this.bodyIpt} onPressEnter={e => {this.pressEnter(e, item.id)}} ></Input> : <Checkbox onChange={e => { this.change(e, item.id) }} checked={item.done}>{item.name}</Checkbox>}
                  <section>
                    <Button type="primary" size="small" onClick={e => { this.reWrite(e, item.id) }} className="btn-change">修改</Button>
                    <Button type="danger" size="small" onClick={e => { this.delete(e, item.id) }}>删除</Button>
                  </section>
                </div>
                {/* 分割线 */}
                {action[index + 1] ? <Divider style={{ margin: '0' }}></Divider> : null}
              </section>
            )
          })
        }
      </div>
    )
  }

  delete = (e, id) => {
    this.props.delete(id)
  }

  change = (e, id) => {
    this.props.change(id)
  }

  reWrite = (e, id) => {
    if (this.bodyIpt.current) {
      this.props.updateContext(this.bodyIpt.current.input.value, id)
    }

    this.props.reWrite(id)
  }

  pressEnter = (e, id) => {
    this.reWrite(e, id)
  }
}
