import React, { Component } from 'react'
import * as actions from '../actions'
import { connect } from 'react-redux'

class Signout extends Component  {
  UNSAFE_componentWillMount() {
    this.props.signoutUser();
  }
  render () {
    return (
      <div>
        Au revoir !
      </div>
      )
    }
}


export default connect(null, actions) (Signout)
