import React, { Component } from 'react'
import loading from './loading.gif'
export class Spinner extends Component {
  render() {
    return (
        <div className='text-center' >
        <img src={loading} alt="loading" style={{ height: '200px', width: '200px' }}/>
      </div>
      
    )
  }
}

export default Spinner
