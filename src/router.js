import React from 'react'
import Router from 'ampersand-router'
import app from 'ampersand-app'
import PublicPage from './pages/public'
import ReposPage from './pages/repos'
import RepoDetailPage from './pages/repo-detail'
import MessagePage from './pages/message-page'
import Layout from './layout'
import Qs from 'qs'
import xhr from 'xhr'

function requiresAuth (handlerName) {
  return function () {
    if (app.me.token) {
      this[handlerName].apply(this, arguments)
    } else {
      this.redirectTo('/')
    }
  }
}

export default Router.extend({
  renderPage (page, opts = {layout: true}) {
    if (opts.layout) {
      page = (
        <Layout me={app.me}>
          {page}
        </Layout>
      )
    }
    React.render(page, document.body)
  },

  routes: {
    '': 'public',
    'repos': requiresAuth('repos'),
    'login': 'login',
    'logout': 'logout',
    'auth/callback?:query': 'callback',
    'repo/:owner/:name': requiresAuth('repoDetail'),
    '*catchAll': 'catchAll'
  },

  public () {
    this.renderPage(<PublicPage />, {layout: false})
  },

  repos () {
    this.renderPage(<ReposPage repos={app.me.repos} />)
  },

  login () {
    const params = {
      client_id: '74c39723b7ef80c1470a',
      redirect_uri: window.location.origin + '/auth/callback',
      scope: 'user,repo'
    }

    window.location = 'https://github.com/login/oauth/authorize?' + Qs.stringify(params)
  },

  logout () {
    window.localStorage.clear()
    window.location = '/'
  },

  callback (query) {
    const params = Qs.parse(query)

    xhr({
      url: 'https://gatekeeper-ghutils.herokuapp.com/authenticate/' + params.code,
      json: true
    }, (err, req, body) => {
      if (err) { window.alert(err) }
      app.me.token = body.token
      this.redirectTo('/repos')
    })

    this.renderPage(<MessagePage title='Fetching your Data' />)
  },

  repoDetail (owner, name) {
    const repo = app.me.repos.getByFullName(`${owner}/${name}`)
    this.renderPage(<RepoDetailPage repo={repo} labels={repo.labels} />)
  },

  catchAll () {
    this.renderPage(<MessagePage title='Not Found' body='sorry nothing here' />)
  }

})
