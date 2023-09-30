import React, { Component } from 'react'
import './App.css'
// import App from 'base-shell/lib'
import App from './containers/App'
import { Provider } from 'react-redux'
import mcApp from './reducer'
import _config from './config'

export default class Demo extends Component {
  render() {
    return <Provider store={mcApp}>
      <App config={_config} />
    </Provider>
  }
}
