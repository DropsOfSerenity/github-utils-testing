import Router from './router'
require('./styles/main.styl')
require('octicons/octicons/octicons.css')
import app from 'ampersand-app'
import Me from './models/me'

window.app = app

app.extend({
  init () {
    this.me = new Me()
    this.me.fetchInitialData()
    this.router = new Router()
    this.router.history.start()
  }
})

app.init()

