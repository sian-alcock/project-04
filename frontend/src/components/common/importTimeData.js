import React, { Component } from 'react'
import axios from 'axios'
import { formatTimeDate } from '../../lib/helpers'

class TimeLoader extends Component {
  constructor() {
    super()

    this.state = {
      loading: false,
      timeDataUpdated: ''
    }
    this.getRaceTimes = this.getRaceTimes.bind(this)
  }

  getRaceTimes(){
    this.setState({ loading: true })
    axios.get('/api/crew-race-times')
      .then(res => {
        console.log(res.data)
      })
      .then(this.setState({ raceTimesDataUpdated: Date.now(), loading: false }
      ))
  }

  render() {
    const { loading } = this.state

    return (
      <div>
        <button className="button is-primary" onClick={this.getRaceTimes} disabled={loading}>
          {loading && (
            <i
              className="fas fa-spinner fa-spin"
              style={{ marginRight: '5px' }}
            />
          )}
          {loading && <span>Loading ...</span>}
          {!loading && <span>Get Race times</span>}
        </button>
        <p><small>{!this.state.timeDataUpdated ? '' : `Updated: ${formatTimeDate(this.state.timeDataUpdated)}`}</small></p>
      </div>
    )
  }
}

export default TimeLoader
