import React, { Component } from 'react'
import preview from './preview.gif'

export class Spinner extends Component {
  render() {
    return (
      <div>
        <img src={preview} alt="loading" />
      </div>
    )
  }
}

export default Spinner
