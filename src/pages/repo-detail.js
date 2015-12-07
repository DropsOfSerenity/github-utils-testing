import React from 'react'
import Label from '../components/label'
import ampersandMixin from 'ampersand-react-mixin'

export default React.createClass({
  mixins: [ampersandMixin],

  propTypes: {
    labels: React.PropTypes.object,
    repo: React.PropTypes.object
  },

  onAddClick () {
    this.props.labels.add({
      name: '',
      color: '',
      editing: true,
      saved: false
    }, {at: 0})
  },

  render () {

    const {repo, labels} = this.props

    return (
      <div className='container'>
        <h1>{repo.full_name}</h1>
        <p>{repo.description}</p>
        <p>
          <button onClick={this.onAddClick} className='button'>Add New</button>
        </p>
        <ul>
          {labels.map((label) =>
            <Label key={label.name} label={label} />
          )}
        </ul>
      </div>
    )
  }
})
