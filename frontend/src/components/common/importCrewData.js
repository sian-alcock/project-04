import React, { Component } from 'react'
import axios from 'axios'
import { formatTimeDate } from '../../lib/helpers'

class CrewLoader extends Component {
  constructor() {
    super()

    this.state = {
      loading: false,
      crewDataUpdated: ''
    }

    // this.fetchData = this.fetchData.bind(this)
    this.getBROECrewData = this.getBROECrewData.bind(this)
    // this.getBROEClubAndEventData = this.getBROEClubAndEventData.bind(this)
  }

  // getBROEClubAndEventData(){
  //   this.setState({ loading: true })
  //   //get clubs and events first, then get crews
  //   Promise.all([
  //     axios.get('/api/club-data-import/'),
  //     axios.get('/api/event-data-import/')
  //   ]).then(([res1, res2]) => {
  //     console.log(res1.data, res2.data)
  //   }, () => this.getBROECrewData())
  // }
  //
  //
  // getBROECrewData(){
  //   axios.get('/api/crew-data-import/')
  //     .then(res => this.setState({ crews: res.data, crewDataUpdated: Date.now(), loading: false }))
  // }

  getBROECrewData(){
    this.setState({ loading: true })
    //get clubs and events first, then get crews
    Promise.all([
      axios.get('/api/club-data-import/'),
      axios.get('/api/event-data-import/')
    ]).then(([res1, res2]) => {
      console.log(res1.data, res2.data)
    }).then(axios.get('/api/crew-data-import/')
      .then(res3 => console.log(res3.data))
      .then(this.setState({ crewDataUpdated: Date.now(), loading: false })))
  }

  render() {
    const { loading } = this.state

    return (
      <div>
        <button className="button is-primary" onClick={this.getBROECrewData} disabled={loading}>
          {loading && (
            <i
              className="fas fa-spinner fa-spin"
              style={{ marginRight: '5px' }}
            />
          )}
          {loading && <span>Loading ...</span>}
          {!loading && <span>Get Crew data</span>}
        </button>
        <p><small>{!this.state.crewDataUpdated ? '' : `Updated: ${formatTimeDate(this.state.crewDataUpdated)}`}</small></p>
      </div>
    )
  }
}

export default CrewLoader
