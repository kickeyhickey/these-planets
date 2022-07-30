import React, { Component } from 'react'
import { Spinner } from 'reactstrap'

export default class Loading extends Component {
  render() {
    return (
        <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    )
  }
}
