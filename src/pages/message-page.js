import React from 'react'

export default React.createClass({

  propTypes: {
    title: React.PropTypes.string,
    body: React.PropTypes.string
  },

  render () {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <p>{this.props.body}</p>
      </div>
    )
  }
})
