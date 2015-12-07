import Model from 'ampersand-model'
import githubMixin from '../helpers/github-mixin'
import xhr from 'xhr'
import assign from 'lodash.assign'
import app from 'ampersand-app'

export default Model.extend(githubMixin, {
  idAttribute: 'name',

  props: {
    'name': 'string',
    'color': 'string'
  },

  session: {
    editing: {
      type: 'boolean',
      default: false
    },
    saved: {
      type: 'boolean',
      default: true
    }
  },

  isNew () {
    return !this.saved
  },

  update (params) {
    const oldAttributes = this.getAttributes({props: true, session: false})
    xhr({
      url: this.url(),
      json: params,
      method: 'PATCH',
      headers: {
        Authorization: 'token ' + app.me.token
      }
    }, (err, res, body) => {
      if (err || res.statusCode >= 400) {
        this.set(assign(oldAttributes, {editing: false}))
      }
    })

    this.set(params)
  }
})
