import '@babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app'

import '../node_modules/bootstrap/scss/bootstrap.scss'
import './styles/index.scss'

ReactDOM.render(
  <App/>,
  document.getElementById('App')
)
