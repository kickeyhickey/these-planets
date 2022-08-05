import React, { Component } from 'react'
import Table from './components/Table'
import './App.css'

export default class App extends Component {
  render() {
    return (
      
      <div className='table-container'>
        <div className='table'>
         <Table />
        </div>
      </div>
     )
  }
}

