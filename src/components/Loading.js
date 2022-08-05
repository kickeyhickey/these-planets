import React, { Component } from 'react'

export default class Loading extends Component {
  render() {
    return (
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    )
  }
}
