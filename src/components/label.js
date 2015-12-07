import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'

export default React.createClass({
  mixins: [ampersandMixin],

  propTypes: {
    label: React.PropTypes.object
  },

  getInitialState () {
    const {name, color} = this.props.label
    return {name, color}
  },

  render () {

    const {label} = this.props
    const {color} = this.state
    const cssColor = '#' + color
    let content

    if (label.editing) {
      content = (
        <form className='label' onSubmit={this.onSubmit}>
          <span className='label-color avatar avatar-small avatar-rounded' style={{backgroundColor: cssColor}}>&nbsp;</span>
          <input name='name' value={this.state.name} onChange={this.onNameChange} />
          <input name='color' value={this.state.color} onChange={this.onColorChange} />
          <button type='submit' className='button button-small'>Save</button>
          <button onClick={this.onCancelClick} type='button' className='button button-small button-secondary'>cancel</button>
        </form>
      )
    } else {
      content = (
        <div className='label'>
          <span className='label-color' style={{backgroundColor: cssColor}}>&nbsp;</span>
          <span>{label.name}</span>
          <span onClick={this.onEditClick} className='octicon octicon-pencil'></span>
          <span onClick={this.onDeleteClick} className='octicon octicon-x'></span>
        </div>
      )
    }

    return <div>{content}</div>
  },

  onNameChange (e) {
    this.setState({
      name: e.target.value
    })
  },

  onColorChange (e) {
    this.setState({
      color: e.target.value
    })
  },

  onEditClick (e) {
    e.preventDefault()
    this.props.label.editing = true
  },

  onCancelClick (e) {
    e.preventDefault()
    const {label} = this.props

    if (label.saved) {
      this.props.label.editing = false
      this.setState(this.getInitialState())
    } else {
      label.destroy()
    }

  },

  onDeleteClick (e) {
    e.preventDefault()
    this.props.label.destroy()
  },

  onSubmit (e) {
    e.preventDefault()
    const {label} = this.props

    if (label.saved) {
      label.update(this.state)
    } else {
      label.save(this.state)
    }
    label.editing = false
  }

})
